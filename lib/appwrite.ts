
import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID || '6922de57001dbd3fb5c3');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Use environment variables for IDs or fallback to the specific project IDs
export const DATABASE_ID = process.env.APPWRITE_DATABASE_ID || '6922dea5003b2433dad8';

// NOTE: These IDs must match the Collection IDs in your Appwrite Database.
// If you did not manually set them to 'academics' and 'placements', 
// replace these strings with the generated IDs (e.g., '65d3...') from the Appwrite Console.
export const COLLECTION_ID_ACADEMICS = process.env.APPWRITE_COLLECTION_ACADEMICS || 'academics'; 
export const COLLECTION_ID_PLACEMENTS = process.env.APPWRITE_COLLECTION_PLACEMENTS || 'placements';

export const BUCKET_ID = process.env.APPWRITE_BUCKET_ID || 'default';
