KG PANEL STORE Android WebView starter

1. In app/src/main/assets/config.js, replace:
   https://YOUR_PROJECT.supabase.co
   sb_publishable_REPLACE_WITH_YOUR_KEY
   with your own Supabase Project URL and Publishable key.

2. Do NOT use a service_role key or secret key in this app.

3. The app reads public rows from public.apps:
   name, description, category, version, download_url.
   Your table must have a SELECT policy for anon/authenticated.

4. Open this project in Android Studio or use GitHub Actions workflow.
   GitHub Actions builds a debug APK when code is pushed to main.

5. This starter includes app catalogue browsing only. Admin login/upload
   is not implemented yet; do not treat the app as a finished store.

6. Only publish legitimate apps you own or are authorized to distribute.
