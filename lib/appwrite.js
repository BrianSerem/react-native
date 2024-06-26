import { Client, Account, ID, Avatars, Databases, Query, Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.recoup.aora',
    projectId: '6632381400322577a0e7',
    databaseId: '663247f3000ea703c7f4',
    usersCollectionId: '663248260022f27bcb7b',
    videoCollectionId: '66324839003af85eccc8',
    storageId: '6632497e0030aa780e46'
}

// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// Register User
export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(username)

        await signIn(email, password)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                account_id: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl
            })

        return newUser

    } catch (error) {
        throw new Error(error)

    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}
export const signOut = async () => {
    try {
        const session = await account.deleteSession('current');
        return session;
    } catch (error) { throw new Error(error) }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get()
        if (!currentAccount) throw Error
        const currentUser = await databases.listDocuments(
            config.databaseId, config.usersCollectionId,
            [Query.equal('account_id', currentAccount.$id)])

        if (!currentUser) throw Error

        return currentUser.documents[0]
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId
        )
        return posts.documents
    }
    catch (error) {
        throw new Error(error)
    }
}

export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents
    }
    catch (error) {
        throw new Error(error)
    }
}

export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.search('title', query)]
        )
        return posts.documents
    }
    catch (error) {
        throw new Error(error)
    }
}

export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('users', userId)]
        )
        return posts.documents
    }
    catch (error) {
        throw new Error(error)
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        if (type === 'video') { fileUrl = storage.getFileView(config.storageId, fileId) }
        else if (type === 'image') { fileUrl = storage.getFilePreview(config.storageId, fileId, 2000, 2000, 'top', 100) }
        else {
            throw new Error('Invalid file type passed')
        }

        if (!fileUrl) throw Error;

        return fileUrl

    } catch (error) {
        throw new Error(error)
    }

}
export const uploadFile = async (file, type) => {
    if (!file) return;
    const { mimeType, ...rest } = file
    const asset = { type: mimeType, ...rest }

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        )
        const fileUrl = await getFilePreview(uploadedFile.$id, type)
        return fileUrl

    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form) => {

    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ])

    const newPost =  await databases.createDocument(
        config.databaseId, config.videoCollectionId, ID.unique(), {
            title: form.title,
            thumbnail: thumbnailUrl,
            video: videoUrl,
            prompt: form.prompt,
            users: form.userId
        }
    )
    return newPost

    } catch (error) {
        throw new Error(error)
    }
}