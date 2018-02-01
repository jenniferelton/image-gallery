import firebase from 'firebase';
  
var config = {
  apiKey: 'AIzaSyDLrZcKSDIlNJweOGv0yJ7F7inPnKVFW24',
  authDomain: 'image-gallery-53f68.firebaseapp.com',
  databaseURL: 'https://image-gallery-53f68.firebaseio.com',
  projectId: 'image-gallery-53f68',
  storageBucket: 'image-gallery-53f68.appspot.com',
  messagingSenderId: '1076726135417'
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth();