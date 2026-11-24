import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

const getUid = () => firebase.auth().currentUser.uid;

export default { getUid };
