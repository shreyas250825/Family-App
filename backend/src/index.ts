
import path from 'path';
import { supabase } from './config/supabase';


const corsOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:8081'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || corsOrigins.includes('*') || corsOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, corsOrigins[0]);
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

async function healthHandler(_req: express.Request, res: express.Response) {
  const hasSupabase =
    !!process.env.SUPABASE_URL && !process.env.SUPABASE_URL.includes('your-project');
  let dbOk = false;
  if (hasSupabase) {
    const { error } = await supabase.from('users').select('id').limit(1);
    dbOk = !error;
  }
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    supabase_configured: hasSupabase,
    database_connected: dbOk,
    version: '1.0.0',
  });
}
app.use((_req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Route not found' } });
});

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: { code: 'INTERNAL', message: err.message || 'Server error' } });
});

const PORT = Number(process.env.PORT) || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`FamZee backend running on http://0.0.0.0:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
});

export default app;