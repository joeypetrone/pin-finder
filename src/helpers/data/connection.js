import axios from 'axios';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../apiKeys.json';

const { databaseURL } = firebaseConfig.firebaseKeys;

// Realtime Database rules require auth, so every REST call to the database
// needs the signed-in user's ID token. getIdToken() returns a cached token and
// refreshes it automatically when it is close to expiring.
const attachAuthToken = async (request) => {
  const user = firebase.auth().currentUser;
  if (user && request.url && request.url.startsWith(databaseURL)) {
    const token = await user.getIdToken();
    const separator = request.url.includes('?') ? '&' : '?';
    request.url += `${separator}auth=${token}`;
  }
  return request;
};

const fireBaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.firebaseKeys);
    axios.interceptors.request.use(attachAuthToken);
  }
};

export default fireBaseApp;
