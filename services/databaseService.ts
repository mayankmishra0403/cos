import { databases, appwriteConfig, storage } from './appwriteConfig';
import { ID, Query } from 'appwrite';

export interface Material {
    $id?: string;
    title: string;
    description?: string;
    fileUrl?: string;
    fileId?: string;
    category: string;
    createdAt?: string;
}

class DatabaseService {
    // Academics materials
    async createAcademicMaterial(material: Material) {
        try {
            return await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.academicsCollectionId,
                ID.unique(),
                {
                    ...material,
                    createdAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.error('DatabaseService :: createAcademicMaterial :: error', error);
            throw error;
        }
    }

    async getAcademicMaterials() {
        try {
            return await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.academicsCollectionId,
                [Query.orderDesc('$createdAt')]
            );
        } catch (error) {
            console.error('DatabaseService :: getAcademicMaterials :: error', error);
            throw error;
        }
    }

    async deleteAcademicMaterial(documentId: string) {
        try {
            return await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.academicsCollectionId,
                documentId
            );
        } catch (error) {
            console.error('DatabaseService :: deleteAcademicMaterial :: error', error);
            throw error;
        }
    }

    // Placement materials
    async createPlacementMaterial(material: Material) {
        try {
            return await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.placementsCollectionId,
                ID.unique(),
                {
                    ...material,
                    createdAt: new Date().toISOString(),
                }
            );
        } catch (error) {
            console.error('DatabaseService :: createPlacementMaterial :: error', error);
            throw error;
        }
    }

    async getPlacementMaterials() {
        try {
            return await databases.listDocuments(
                appwriteConfig.databaseId,
                appwriteConfig.placementsCollectionId,
                [Query.orderDesc('$createdAt')]
            );
        } catch (error) {
            console.error('DatabaseService :: getPlacementMaterials :: error', error);
            throw error;
        }
    }

    async deletePlacementMaterial(documentId: string) {
        try {
            return await databases.deleteDocument(
                appwriteConfig.databaseId,
                appwriteConfig.placementsCollectionId,
                documentId
            );
        } catch (error) {
            console.error('DatabaseService :: deletePlacementMaterial :: error', error);
            throw error;
        }
    }

    // File upload to storage
    async uploadFile(file: File) {
        try {
            const response = await storage.createFile(
                'default', // bucket ID - you'll need to create this in Appwrite
                ID.unique(),
                file
            );
            return response;
        } catch (error) {
            console.error('DatabaseService :: uploadFile :: error', error);
            throw error;
        }
    }

    async deleteFile(fileId: string) {
        try {
            await storage.deleteFile('default', fileId);
        } catch (error) {
            console.error('DatabaseService :: deleteFile :: error', error);
            throw error;
        }
    }

    getFilePreview(fileId: string) {
        return storage.getFilePreview('default', fileId);
    }

    getFileView(fileId: string) {
        return storage.getFileView('default', fileId);
    }
}

const databaseService = new DatabaseService();
export default databaseService;
