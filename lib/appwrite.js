import { Client, Account, ID, Avatars, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.recoup.aora',
    projectId: '6632381400322577a0e7',
    databaseId: '663247f3000ea703c7f4',
    usersCollectionId: '663248260022f27bcb7b',
    videosCollectioniD: '66324839003af85eccc8',
    storageId: '6632497e0030aa780e46'
}


// Init your react-native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User
export const creatUser = async (email, password, username) => {
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
                accountId: newAccount.$id,
                email, username,
                avatar: avatarUrl
            })

            return newUser

    } catch (error) {
        throw new Error(error)

    }
}

export async function signIn(email, password) {
    console.log('imfeeeeen')
    try {
        const session = await account.createEmailSession(email, password)
        return session
    } catch (error) {
        throw new Error(error)
    }
}