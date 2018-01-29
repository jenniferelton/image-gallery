import firebase from 'firebase';
  

var config = {
  apiKey: 'AIzaSyB9NdosiC7HysbDHTF957E8sOGZsxlGKhM',
  authDomain: 'designer-spring-summer.firebaseapp.com',
  databaseURL: 'https://designer-spring-summer.firebaseio.com',
  projectId: 'designer-spring-summer',
  storageBucket: 'designer-spring-summer.appspot.com',
  messagingSenderId: '700058728110'
};

const firebaseApp = firebase.initializeApp(config);

export const db = firebaseApp.database();
export const storage = firebaseApp.storage();
export const auth = firebaseApp.auth();