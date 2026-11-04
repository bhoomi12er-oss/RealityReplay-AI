/**
 * RealityReplay AI - Meta Model API Vision Request Handler
 * Shared between standalone server (server/index.js) and Vite dev middleware.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Ensure .env is read
export function loadEnv() {
  const envPath = path.join(ROOT_DIR, '.env');
  if (fs.existsSync(envPath)) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      content.split('\n').forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    } catch (e) {
      console.warn('[Meta API] Could not parse .env file:', e.message);
    }
  }
}

loadEnv();

export function getMetaConfig() {
  return {
    baseUrl: (process.env.META_BASE_URL || 'https://api.meta.ai/v1').replace(/\/+$/, ''),
    model: process.env.META_MODEL || 'muse-spark-1.3',
    apiKey: process.env.META_API_KEY || '',
  };
}

export function generateHonestFallback({
  projectName = 'Unnamed Space',
  projectCategory = 'General Renovation',
  projectGoals: _projectGoals = '',
  milestones = [],
  notes: _notes = '',
  reason = 'Meta Model API key not configured in .env. Running in transparent Demo Mode.',
}) {
  const { model } = getMetaConfig();

  const defaultMilestones = milestones && milestones.length > 0
    ? milestones.map((m) => (typeof m === 'string' ? { name: m } : m))
    : [
        { name: 'Site Clearing & Initial Teardown' },
        { name: 'Structural Rough-In & Framing' },
        { name: 'Surfaces, Finishes & Installations' },
        { name: 'Fixtures, Lighting & Final Detailing' },
      ];

  // In demo mode: NEVER make fabricated claims or mark milestones as "Observed".
  // Mark all milestones as "Not Yet Verified" until actual Meta Vision analysis succeeds.
  const audits = defaultMilestones.map((m) => ({
    name: m.name,
    status: 'Not Yet Verified',
    visualEvidence: 'Awaiting live Meta Vision analysis. Visual evidence has not yet been processed by the multimodal model.',
    uncertaintyFactor: 'Unverified in Demo Mode. Connect META_API_KEY in .env to run real visual audits.',
  }));

  return {
    success: true,
    isDemoFallback: true,
    isVerified: false,
    fallbackReason: reason,
    provider: 'Meta Model API (Demo Mode - Unverified)',
    model,
    analysis: {
      overallProgress: null,
      uncertaintyMargin: null,
      confidenceScore: null,
      isVerified: false,
      perspectiveDriftAssessment:
        'Camera angle and focal drift computation requires live Meta Vision model inference. Connect META_API_KEY in .env to compute spatial alignment.',
      summaryOfChanges: `Demo Mode: Visual evidence uploaded for "${projectName}" (${projectCategory}). Automated visual change detection and progress auditing require live Meta Model API access. Milestones remain unverified.`,
      milestoneAudits: audits,
      unplannedObservations: [
        'Live model access is pending. No visual modifications or anomalies can be confirmed.',
      ],
      suggestedNextCheckInAngles: [
        'Connect META_API_KEY in .env to activate automated perspective guidance.',
      ],
    },
  };
}

export async function callMetaVisionAPI(data) {
  const { baseUrl, model, apiKey } = getMetaConfig();

  if (!apiKey) {
    return generateHonestFallback({
      projectName: data.projectName,
      projectCategory: data.projectCategory,
      projectGoals: data.projectGoals,
      milestones: data.milestones,
      notes: data.notes,
      reason: 'No META_API_KEY detected in backend .env file. Running in transparent Demo Fallback mode.',
    });
  }

  const promptText = `You are RealityReplay AI, an objective spatial transformation auditor.
You are comparing two real-world photos taken over time:
- Image 1: Day 0 Baseline Photo (Initial state of the space)
- Image 2: Check-in Photo (Latest progress evidence)

Project Context:
- Space Name: "${data.projectName || 'Unnamed Space'}"
- Space Category: "${data.projectCategory || 'General Renovation'}"
- Target Transformation Goals: "${data.projectGoals || 'Not specified'}"
- User Check-In Field Notes: "${data.notes || 'None provided'}"
${
  data.milestones && data.milestones.length > 0
    ? `- Planned Target Milestones: ${data.milestones.map((m) => m.name || m).join('; ')}`
    : ''
}

CRITICAL RULES:
1. Do not invent or hallucinate changes. If something is not clearly visible in Image 2, mark it as "Not Yet Observed" or "Needs Review".
2. Account for camera perspective drift, focal length, time-of-day lighting, and partial occlusions between Image 1 and Image 2.
3. Every milestone must be categorized into one of exactly four statuses:
   - "Observed" (Unambiguous, verifiable visual proof that work is completed)
   - "Partially Observed" (Physical progress visible, but incomplete)
   - "Not Yet Observed" (No visible evidence that work has started or changed from baseline)
   - "Needs Review" (Camera angle, lighting, or obstruction prevents confident verification)
4. Provide an evidence-based explanation for each milestone citing visual anchors.
5. Calculate a conservative verified progress percentage (0-100) based strictly on verified visual evidence, with an uncertainty margin (e.g. 5 for ±5%).

Return strictly a valid JSON object without markdown formatting:
{
  "overallProgress": number,
  "uncertaintyMargin": number,
  "confidenceScore": number,
  "perspectiveDriftAssessment": "string describing perspective / angle drift between photos",
  "summaryOfChanges": "string summary of observed physical changes",
  "milestoneAudits": [
    {
      "name": "milestone name",
      "status": "Observed" | "Partially Observed" | "Not Yet Observed" | "Needs Review",
      "visualEvidence": "specific visual proof or lack thereof",
      "uncertaintyFactor": "confidence rationale"
    }
  ],
  "unplannedObservations": ["string"],
  "suggestedNextCheckInAngles": ["string advice for better alignment next time"]
}`;

  try {
    const endpoint = `${baseUrl}/chat/completions`;
    console.log(`[Meta API] Calling Meta Model API at ${endpoint} (${model})...`);

    const payload = {
      model,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: promptText },
            { type: 'image_url', image_url: { url: data.baselineImage } },
            { type: 'image_url', image_url: { url: data.checkInImage } },
          ],
        },
      ],
      temperature: 0.15,
      max_tokens: 2000,
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`[Meta API] API responded with HTTP ${response.status}: ${errText}`);
      return generateHonestFallback({
        projectName: data.projectName,
        projectCategory: data.projectCategory,
        projectGoals: data.projectGoals,
        milestones: data.milestones,
        notes: data.notes,
        reason: `Meta API returned HTTP ${response.status} (${errText.slice(0, 100)}...). Running in transparent demo mode.`,
      });
    }

    const json = await response.json();
    const rawContent = json?.choices?.[0]?.message?.content || '';

    const cleanContent = rawContent
      .replace(/^```json\s*/i, '')
      .replace(/^```\s*/, '')
      .replace(/\s*```$/, '')
      .trim();

    const parsedAnalysis = JSON.parse(cleanContent);

    return {
      success: true,
      isDemoFallback: false,
      provider: 'Meta Model API',
      model,
      analysis: parsedAnalysis,
    };
  } catch (err) {
    console.error('[Meta API] Request failed:', err);
    return generateHonestFallback({
      projectName: data.projectName,
      projectCategory: data.projectCategory,
      projectGoals: data.projectGoals,
      milestones: data.milestones,
      notes: data.notes,
      reason: `Meta Vision network error: ${err.message}. Running in transparent demo mode.`,
    });
  }
}

export async function handleApiRequest(req, res) {
  const url = new URL(req.url, 'http://localhost');

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    res.end();
    return true;
  }

  if (req.method === 'GET' && url.pathname === '/api/health') {
    const config = getMetaConfig();
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(
      JSON.stringify({
        status: 'ok',
        service: 'RealityReplay AI Meta Vision Backend',
        provider: 'Meta Model API',
        configured: Boolean(config.apiKey),
        model: config.model,
        baseUrl: config.baseUrl,
        timestamp: new Date().toISOString(),
      })
    );
    return true;
  }

  if (req.method === 'POST' && url.pathname === '/api/analyze-checkin') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      if (body.length > 30 * 1024 * 1024) {
        req.destroy();
      }
    });

    return new Promise((resolve) => {
      req.on('end', async () => {
        try {
          const data = JSON.parse(body);

          if (!data.baselineImage || !data.checkInImage) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(
              JSON.stringify({
                error: 'Both baselineImage and checkInImage are required for comparison.',
              })
            );
            resolve(true);
            return;
          }

          const result = await callMetaVisionAPI(data);
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify(result));
          resolve(true);
        } catch (err) {
          console.error('[Meta API] /api/analyze-checkin error:', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(
            JSON.stringify({
              error: 'Failed to process check-in visual analysis request.',
              details: err.message,
            })
          );
          resolve(true);
        }
      });
    });
  }

  return false;
}
