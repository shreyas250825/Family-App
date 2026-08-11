import { supabase } from '../config/supabase';

const UPLOAD_DIR = path.join(process.cwd(), 'uploads');
const BUCKET = process.env.SUPABASE_STORAGE_BUCKET || 'famzee-media';

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function publicUrl(relativePath: string): string {
  const base = process.env.PUBLIC_API_URL?.replace(/\/$/, '') || '';
  return `${base}${relativePath}`;
}
export const uploadMedia = async (
  file: Express.Multer.File,
  familyId: string,
  userId: string
): Promise<string> => {
  const ext = path.extname(file.originalname) || '.jpg';
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;
  const storagePath = `${familyId}/${userId}/${filename}`;

  const hasSupabase =
    process.env.SUPABASE_URL &&
    !process.env.SUPABASE_URL.includes('your-project') &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    !process.env.SUPABASE_SERVICE_ROLE_KEY.includes('your-service');

  if (hasSupabase) {
    const buffer = fs.readFileSync(file.path);
    const { data, error } = await supabase.storage.from(BUCKET).upload(storagePath, buffer, {
      contentType: file.mimetype,
      upsert: false,
    });
    if (error) throw error;
    const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(data.path);
    try {
      fs.unlinkSync(file.path);
    } catch {
      /* ignore */
    }
    return urlData.publicUrl;
  }

  ensureUploadDir();
  const familyDir = path.join(UPLOAD_DIR, familyId);
  if (!fs.existsSync(familyDir)) fs.mkdirSync(familyDir, { recursive: true });
  const dest = path.join(familyDir, filename);
  fs.renameSync(file.path, dest);
  return publicUrl(`/uploads/${familyId}/${filename}`);