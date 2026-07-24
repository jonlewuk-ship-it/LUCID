import { createClient } from '@supabase/supabase-js'

// Client-side Supabase (uses anon key, respects RLS)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// Server-side Supabase (uses service role, bypasses RLS)
export function createServerClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// Image upload helper
export async function uploadImage(
  file: File,
  folder: string = 'photos'
): Promise<string> {
  const ext = file.name.split('.').pop()
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .upload(path, file, { upsert: true })

  if (error) throw new Error('Upload failed: ' + error.message)

  const { data: urlData } = supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET!)
    .getPublicUrl(data.path)

  return urlData.publicUrl
}
