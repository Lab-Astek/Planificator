import admin from 'firebase-admin';
import firebase from 'firebase';

import serviceAccountKey from 'config/serviceAccountKey.json';
import firebaseConfig from 'config/firebaseConfig.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: 'https://planificator-e67cd.firebaseio.com',
});

firebase.initializeApp(firebaseConfig);

class Database {
  constructor() {
    this._database = admin.database();
  }

  async getArrayFrom(path) {
    const dbObject = (await this._database.ref(path).once('value')).val() || {};
    return Object.values(dbObject);
  }

  async getValueFrom(path) {
    const value = await this._database.ref(path).once('value');
    return value.val();
  }

  async set(path, value) {
    await this._database.ref(path).set(value);
  }

  async update(path, value) {
    await this._database.ref(path).update(value);
  }

  async push(path, value) {
    const newRef = await this._database.ref(path).push(value);
    return {
      id: newRef.key,
      ...value,
    };
  }

  async delete(path) {
    await this._database.ref(path).remove();
  }
}

const database = new Database();

module.exports = {
  database,
  firebase,
};
