
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ichwtlkazihzvtpmxbnw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljaHd0bGthemloenZ0cG14Ym53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ3NTYwODIsImV4cCI6MTk4MDMzMjA4Mn0.qwdxq37vL8ra1vjeCWpysrSj49TMQa0Xzeovwegxx3g';

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;