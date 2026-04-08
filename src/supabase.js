import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://rgxvdkwqsfpwheibxsrw.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJneHZka3dxc2Zwd2hlaWJ4c3J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUwNjAxMTEsImV4cCI6MjA5MDYzNjExMX0.o24mD2RisFm9cjyNXNTslBWZkAZFP31BvX5dabNfrAg'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
