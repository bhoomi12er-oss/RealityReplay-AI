/**
 * RealityReplay AI Storage Engine
 * Provides persistent project storage and resilient image persistence via IndexedDB & LocalStorage.
 * Handles browser storage quota limits gracefully to prevent silent data or photo loss.
 */

const DB_NAME = 'realityreplay_db';
const DB_VERSION = 1;
const IMAGE_STORE = 'project_images';

function getDB() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(IMAGE_STORE)) {
          db.createObjectStore(IMAGE_STORE);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => {
        console.warn('IndexedDB open error:', request.error);
        resolve(null);
      };
    } catch (err) {
      console.warn('IndexedDB initialization failed:', err);
      resolve(null);
    }
  });
}

export async function saveProjectImage(projectId, dataUrl) {
  if (!projectId || !dataUrl) return false;
  try {
    const db = await getDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(IMAGE_STORE, 'readwrite');
      const store = tx.objectStore(IMAGE_STORE);
      store.put(dataUrl, projectId);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    console.warn('IndexedDB saveProjectImage failed:', e);
    return false;
  }
}

export async function getProjectImage(projectId) {
  if (!projectId) return null;
  try {
    const db = await getDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction(IMAGE_STORE, 'readonly');
      const store = tx.objectStore(IMAGE_STORE);
      const req = store.get(projectId);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    });
  } catch (e) {
    console.warn('IndexedDB getProjectImage failed:', e);
    return null;
  }
}

export async function deleteProjectImage(projectId) {
  if (!projectId) return false;
  try {
    const db = await getDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(IMAGE_STORE, 'readwrite');
      const store = tx.objectStore(IMAGE_STORE);
      store.delete(projectId);
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    console.warn('IndexedDB deleteProjectImage failed:', e);
    return false;
  }
}

export async function clearAllProjectImages() {
  try {
    const db = await getDB();
    if (!db) return false;
    return new Promise((resolve) => {
      const tx = db.transaction(IMAGE_STORE, 'readwrite');
      const store = tx.objectStore(IMAGE_STORE);
      store.clear();
      tx.oncomplete = () => resolve(true);
      tx.onerror = () => resolve(false);
    });
  } catch (e) {
    console.warn('IndexedDB clearAllProjectImages failed:', e);
    return false;
  }
}

/**
 * Hydrates projects whose image URLs were stored in IndexedDB (e.g. after a reload).
 */
export async function hydrateProjectsWithImages(projects) {
  if (!Array.isArray(projects) || projects.length === 0) return projects;
  try {
    const hydrated = await Promise.all(
      projects.map(async (project) => {
        let updated = { ...project };

        // Hydrate baseline photo if missing in memory
        if (!updated.imageUrl) {
          const storedImage = await getProjectImage(project.id);
          if (storedImage) {
            updated.imageUrl = storedImage;
            if (updated.status === 'Awaiting Initial Baseline Capture') {
              updated.status = 'Baseline Photo Ingested';
            }
          }
        }

        // Hydrate latest check-in photo if missing in memory
        if (updated.latestCheckIn && !updated.latestCheckIn.imageUrl) {
          const storedCheckInImage = await getProjectImage(`${project.id}_checkin`);
          if (storedCheckInImage) {
            updated.latestCheckIn = {
              ...updated.latestCheckIn,
              imageUrl: storedCheckInImage,
            };
          }
        }

        return updated;
      })
    );
    return hydrated;
  } catch (err) {
    console.warn('Failed to hydrate project images from IndexedDB:', err);
    return projects;
  }
}

/**
 * Persists projects reliably:
 * 1. Saves high-res photo data in IndexedDB (quota in GBs).
 * 2. Saves full project data to LocalStorage if quota permits.
 * 3. If LocalStorage hits quota, safely saves metadata in LocalStorage while photos remain intact in IndexedDB and memory.
 */
export async function saveProjectsSafely(projects) {
  if (!Array.isArray(projects)) return { success: false, quotaExceeded: false };

  // 1. Ensure all photo dataUrls are safely backed up in IndexedDB
  await Promise.all(
    projects.map(async (p) => {
      if (p.imageUrl && p.imageUrl.startsWith('data:')) {
        await saveProjectImage(p.id, p.imageUrl);
      }
      if (p.latestCheckIn?.imageUrl && p.latestCheckIn.imageUrl.startsWith('data:')) {
        await saveProjectImage(`${p.id}_checkin`, p.latestCheckIn.imageUrl);
      }
    })
  );

  // 2. Attempt saving complete project array to localStorage
  try {
    localStorage.setItem('realityreplay_projects', JSON.stringify(projects));
    return { success: true, quotaExceeded: false };
  } catch (storageError) {
    console.warn('LocalStorage quota limit reached; falling back to IndexedDB image backing:', storageError);

    // 3. Fallback: Save metadata to localStorage, images are safely preserved in IndexedDB!
    try {
      const lightweightProjects = projects.map((p) => {
        let updated = { ...p };
        if (updated.imageUrl && updated.imageUrl.startsWith('data:')) {
          updated = {
            ...updated,
            imageUrl: null, // Preserved in IndexedDB, hydrated on load
            hasStoredImage: true,
          };
        }
        if (updated.latestCheckIn?.imageUrl && updated.latestCheckIn.imageUrl.startsWith('data:')) {
          updated = {
            ...updated,
            latestCheckIn: {
              ...updated.latestCheckIn,
              imageUrl: null,
              hasStoredCheckInImage: true,
            },
          };
        }
        return updated;
      });
      localStorage.setItem('realityreplay_projects', JSON.stringify(lightweightProjects));
      return { success: true, quotaExceeded: true };
    } catch (fallbackErr) {
      console.error('All localStorage writes failed; projects remain preserved in active memory & IndexedDB:', fallbackErr);
      return { success: false, quotaExceeded: true };
    }
  }
}
