/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_ENDPOINT: string;
  readonly VITE_APPWRITE_PROJECT_ID: string;
  readonly VITE_APPWRITE_DATABASE_ID: string;
  readonly VITE_APPWRITE_ACADEMICS_COLLECTION_ID: string;
  readonly VITE_APPWRITE_PLACEMENTS_COLLECTION_ID: string;
  readonly VITE_APPWRITE_BUCKET_ID: string;
  readonly VITE_OPENROUTER_API_KEY: string;
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
