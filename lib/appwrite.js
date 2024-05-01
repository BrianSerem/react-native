import { Client, Account, ID } from 'react-native-appwrite';

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

// Register User
export const creatUser = (email, password, username) => {
    account.create(ID.unique(), email, password, username)
    .then(function (response) {
        console.log(response);
    }, function (error) {
         
        console.log(error);
    });
}