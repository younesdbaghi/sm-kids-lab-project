import express from 'express';
import cors from 'cors';
import path from 'path';
import type { fileURLToPath } from 'url';
import type { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import type { initDatabase } from './server/db.ts';
import type { apiRouter } from './server/routes/api.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

  // Middlewares
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));

  // Initialize DB & Seed default user/activities
  await initDatabase();

  // Mount API Router
  app.use('/api', apiRouter);

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', name: 'Smart Kids Lab API', time: new Date().toISOString() });
  });

  // Mount Vite in dev mode or serve static files in production
  const isProduction = process.env.NODE_ENV === 'production';
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Smart Kids Lab serveur en marche sur http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Erreur au démarrage du serveur:', err);
  process.exit(1);
});
