export const ALLOWED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

/**
 * Format bytes into human-readable string (e.g. 1.4 MB)
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

/**
 * Validate image file type and size
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file selected.' };
  }

  const fileType = file.type.toLowerCase();
  const fileName = file.name.toLowerCase();
  const hasValidExtension =
    fileName.endsWith('.jpg') ||
    fileName.endsWith('.jpeg') ||
    fileName.endsWith('.png') ||
    fileName.endsWith('.webp');

  const isValidType =
    ALLOWED_IMAGE_TYPES.includes(fileType) || hasValidExtension;

  if (!isValidType) {
    return {
      valid: false,
      error: 'Invalid file format. Please upload a JPG, JPEG, PNG, or WEBP image.',
    };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size (${formatBytes(file.size)}) exceeds the 5 MB limit. Please choose a smaller photo.`,
    };
  }

  return { valid: true };
}

/**
 * Process and optimize an image file for fast in-browser preview and safe storage.
 * Resizes large dimensions to maxDimension while maintaining high visual quality.
 */
export function processAndOptimizeImage(file, maxDimension = 1200, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      reject(new Error(validation.error));
      return;
    }

    const reader = new FileReader();

    reader.onerror = () => {
      reject(new Error('Failed to read the selected file. Please try again.'));
    };

    reader.onload = (event) => {
      const rawDataUrl = event.target.result;

      // Create an image to check dimensions and compress via canvas
      const img = new Image();

      img.onerror = () => {
        // If image object fails to decode, fallback to the raw data URL
        resolve({
          dataUrl: rawDataUrl,
          name: file.name,
          size: file.size,
          formattedSize: formatBytes(file.size),
          type: file.type,
        });
      };

      img.onload = () => {
        try {
          let { width, height } = img;

          // Scale down if larger than maxDimension
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = Math.round((height * maxDimension) / width);
              width = maxDimension;
            } else {
              width = Math.round((width * maxDimension) / height);
              height = maxDimension;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          // Smooth rendering
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, width, height);

          // Compress to JPEG for space photo baselines - reduces memory and storage footprint by up to 95%
          let optimizedDataUrl;
          try {
            optimizedDataUrl = canvas.toDataURL('image/jpeg', quality);
          } catch {
            optimizedDataUrl = canvas.toDataURL('image/png');
          }

          const optimizedSize = Math.round((optimizedDataUrl.length * 3) / 4);

          resolve({
            dataUrl: optimizedDataUrl,
            name: file.name,
            size: optimizedSize,
            formattedSize: formatBytes(optimizedSize),
            type: 'image/jpeg',
            width,
            height,
          });
        } catch {
          // If canvas operation throws (e.g. security or memory), use raw DataURL
          const approxBytes = Math.round((rawDataUrl.length * 3) / 4);
          resolve({
            dataUrl: rawDataUrl,
            name: file.name,
            size: file.size || approxBytes,
            formattedSize: formatBytes(file.size || approxBytes),
            type: file.type,
          });
        }
      };

      img.src = rawDataUrl;
    };

    reader.readAsDataURL(file);
  });
}
