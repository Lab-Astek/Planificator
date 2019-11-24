import admin from 'firebase-admin';
import firebase from 'firebase';

import serviceAccountKey from 'config/serviceAccountKey.json';
import firebaseConfig from 'config/firebaseConfig.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://planificator-e67cd.firebaseio.com',
});

firebase.initializeApp(firebaseConfig);

const database = admin.database();

module.exports = {
  database,
  firebase,
};
