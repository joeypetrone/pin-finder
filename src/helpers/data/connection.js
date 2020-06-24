import firebase from 'firebase/app';
import firebaseConfig from '../apiKeys.json';

const fireBaseApp = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig.firebaseKeys);
  }
};

export default fireBaseApp;
