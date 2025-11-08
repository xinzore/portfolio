import { createClient } from '@supabase/supabase-js'

// ENV değişkenlerini Vite üzerinden alıyoruz
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Değerler gelmezse hata fırlat (debug için iyi olur)
if (!supabaseUrl) {
  throw new Error('Missing VITE_SUPABASE_URL. Vercel → Project → Settings → Environment Variables kısmına ekleyin.')
}

if (!supabaseKey) {
  throw new Error('Missing VITE_SUPABASE_ANON_KEY. Vercel → Project → Settings → Environment Variables kısmına ekleyin.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
