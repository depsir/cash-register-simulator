import { createClient } from '@supabase/supabase-js';

let supabase;

if (typeof window !== 'undefined') {
  const SUPABASE_URL = window.ENV?.SUPABASE_URL;
  const SUPABASE_ANON_KEY = window.ENV?.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables in the browser.');
  }

  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
} else {
  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables on the server.');
  }

  supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export { supabase };