import {Client} from 'react-native-appwrite';
import {Account, Avatars, Databases, ID, Query, Storage} from "react-native-appwrite/src";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.padmanabhasmac.aora',
    projectId: '6623512b9159a7cafb15',
    databaseId: '66235280e73dcfbabf7e',
    usersCollectionId: '662352928480626874a0',
    videosCollectionId: '662352abf15a70bf698d',
    storageId: '662354a7a8e354eb30f5',
};

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export async function createUser(username, email, password) {
    try {
        const newAccount = await account.create(ID.unique(), email, password, username);
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl,
            },
        );

        return newUser;
    } catch (error) {
        console.error('inside catch of createUser', error);
    }
}

export async function signIn(email, password) {
    try {
        console.log('signIn called');
        const session = await account.createEmailSession(email, password);
        // const session = await account.createEmailSession('padmanabhadas9647@gmail.com', '12341234');
        console.log('session', JSON.stringify(session));
        await AsyncStorage.setItem('userId', session.userId);
        await AsyncStorage.setItem('providerUid', session.providerUid);

        console.log(await AsyncStorage.multiGet(['userId', 'providerUid']));
        return session;
    } catch (error) {
        console.error('inside catch of signIn', error);
    }
}

export async function getAccount() {
    try {
        const currentAccount = await account.get();

        return currentAccount;
    } catch (error) {
        throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
        console.log('getCurrentUser called');

        const currentAccount = await getAccount();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.usersCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log('inside catch of getCurrentUser', error);
        // console.error('inside catch of getCurrentUser', error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.orderDesc('$createdAt')]
        );
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            // [Query.orderDesc('$createdAt', Query.limit(7))]
        );
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.search("title", query)]
        );
        if (!posts) throw new Error("Something went wrong");
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.equal("creator", userId), Query.orderDesc('$createdAt')],
        );
        if (!posts) throw new Error("Something went wrong");
        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signout = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;
    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(appwriteConfig.storageId, fileId, 2000, 2000, 'top', 100);
        } else {
            throw new Error('Invalid file type');
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (e) {
        console.log(`inside catch in getFilePreview: ${e.message}`);
        throw new Error(e);
    }
}

export const uploadFile = async (file, type) => {
    if (!file) return;

    const {mimeType, ...rest} = file;
    const asset = {
        name: file.fileName,
        type: file.mimeType,
        size: file.fileSize,
        uri: file.uri,
    };

    try {
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            asset,
        );
        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        console.log(`fileUrl: ${fileUrl}`);
        return fileUrl;
    } catch (e) {
        console.log(`inside catch in uploadFile: ${e.message}`);
        throw new Error(e);
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, "image"),
            uploadFile(form.video, "video"),
        ]);
        console.log(`thumbnailUrl: ${thumbnailUrl}`);
        console.log(`videoUrl: ${videoUrl}`);

        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId,
            }
        );

        return newPost;
    } catch (e) {
        console.log(`inside catch in createVideo: ${e.message}`);
        throw new Error(e);
    }
}
