import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { handleApiRequest } from './server/apiHandler.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    {
      name: 'meta-api-dev-server',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if (req.url && (req.url.startsWith('/api/') || req.url === '/api')) {
            const handled = await handleApiRequest(req, res);
            if (handled) return;
          }
          next();
        });
      },
    },
  ],
})
