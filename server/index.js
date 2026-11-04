/**
 * RealityReplay AI - Standalone Server
 * Runs on port 3001 (or process.env.PORT)
 */

import http from 'node:http';
import { handleApiRequest, getMetaConfig, loadEnv } from './apiHandler.js';

loadEnv();

const config = getMetaConfig();
const PORT = parseInt(process.env.PORT || '3001', 10);

const server = http.createServer(async (req, res) => {
  const handled = await handleApiRequest(req, res);
  if (!handled) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
});

server.listen(PORT, () => {
  console.log(`\n=================================================`);
  console.log(`RealityReplay AI - Meta Model API Server Running`);
  console.log(`Port:           ${PORT}`);
  console.log(`Base URL:       ${config.baseUrl}`);
  console.log(`Model:          ${config.model}`);
  console.log(`API Key Stored: ${config.apiKey ? 'Yes (configured in .env)' : 'No (Demo Fallback Active)'}`);
  console.log(`=================================================\n`);
});
