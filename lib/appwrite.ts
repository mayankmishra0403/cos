import { Client, Account, Databases } from 'appwrite';

// CONFIGURATION
export const appwriteConfig = {
  endpoint: process.env.REACT_APP_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1',
  projectId: process.env.REACT_APP_APPWRITE_PROJECT_ID || '6922de57001dbd3fb5c3',
  databaseId: process.env.REACT_APP_APPWRITE_DATABASE_ID || '6922dea5003b2433dad8',
  collectionIdAcademics: process.env.REACT_APP_COLLECTION_ACADEMICS || 'academics',
  collectionIdPlacements: process.env.REACT_APP_COLLECTION_PLACEMENTS || 'placements',
};

const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);

// Admin Configuration
export const ADMIN_EMAIL = "admin@gmail.com";

export const isUserAdmin = (email: string) => {
  return email === ADMIN_EMAIL;
};