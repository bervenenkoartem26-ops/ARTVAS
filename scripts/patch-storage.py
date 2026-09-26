from pathlib import Path

p = Path('index.html')
text = p.read_text(encoding='utf-8')
start = text.find('        // ===== Supabase Storage (фото и голосовые) =====')
end = text.find('        const firebaseConfig =', start)
if start < 0 or end < 0:
    raise SystemExit('Supabase storage block not found')

replacement = '''        // ===== Supabase Storage (фото и голосовые) =====
        var SUPABASE_STORAGE_URL = SUPABASE_URL.replace('.supabase.co', '.storage.supabase.co');

        async function uploadToSupabase(fileOrBlob, filename, folder) {
            if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error('Supabase не настроен');
            if (!currentUser?.uid) throw new Error('Нужно войти в аккаунт перед загрузкой файла');

            const safeName = String(filename || 'file').replace(/[^a-zA-Z0-9._-]/g, '_');
            const uniqueId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}_${Math.random().toString(36).slice(2)}`;
            const safeFolder = String(folder || 'files').replace(/[^a-zA-Z0-9._-]/g, '_');
            const path = `${safeFolder}/${currentUser.uid}/${Date.now()}_${uniqueId}_${safeName}`;

            try {
                const supabase = await getSupabaseClient();
                const { error } = await supabase.storage
                    .from(SUPABASE_BUCKET)
                    .upload(path, fileOrBlob, {
                        cacheControl: '3600',
                        contentType: fileOrBlob.type || 'application/octet-stream',
                        upsert: false
                    });

                if (error) {
                    console.error('Supabase upload error:', error);
                    throw new Error(error.message || 'Ошибка загрузки файла');
                }

                const { data } = supabase.storage
                    .from(SUPABASE_BUCKET)
                    .getPublicUrl(path);

                if (!data?.publicUrl) throw new Error('Supabase не вернул ссылку на файл');
                return data.publicUrl;
            } catch (error) {
                console.error('Supabase upload error:', error);
                throw new Error(error?.message || 'Не удалось загрузить файл в Supabase Storage');
            }
        }

'''

p.write_text(text[:start] + replacement + text[end:], encoding='utf-8')
print('Patched index.html')
