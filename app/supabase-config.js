// Shared Supabase connection — loaded by index.html and dms.html.
// The anon key here is meant to be public; real security is enforced
// by the row-level security policies set up in supabase-setup.sql.

const SUPABASE_URL = "https://zckopyjykhxwlkljosud.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpja29weWp5a2h4d2xrbGpvc3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NzQ3MzUsImV4cCI6MjEwMDE1MDczNX0.aOkEMUi_OZS5vMm6g3wzTFxM1lq0JTbp7jpYVmmbUCU";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// AeroChat doesn't use real email addresses — accounts are by username.
// This turns a username into a fake-but-valid email so Supabase Auth
// (which is email/password based) still works behind the scenes.
function usernameToEmail(username) {
  const clean = username.toLowerCase().trim().replace(/[^a-z0-9]/g, '');
  return `${clean}@example.com`;
}