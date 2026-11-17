# KG PANEL STORE Android starter

A minimal Android WebView app that reads the public app catalogue from Supabase.

## Before building
Edit `app/src/main/assets/config.js` and insert your Supabase Project URL and Publishable key.
Never add a `service_role` or secret key.

## Build
Push the project to the `main` branch. GitHub Actions runs the workflow in
`.github/workflows/android.yml`. Download the generated APK from the workflow run's
Artifacts section.

This is a starter catalogue, not a finished admin system. Admin login and upload
must be added securely before production use. Only distribute legitimate apps you
own or are authorized to share.
