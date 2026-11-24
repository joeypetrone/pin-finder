import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import propertyData from './propertyData';
import pinData from './pinData';

// Sample data a new guest starts with, so the demo isn't an empty page.
// Copied from db/properties.json (property01) and db/pins.json (pin01, pin02).
const sampleProperty = {
  name: 'Tennessee State Capitol',
  centerLat: 36.165763,
  centerLng: -86.784209,
  description: 'Greek Revival 1845-1859 legislative building & grounds housing the tomb of President James K. Polk.',
  imageUrl: 'https://lh6.googleusercontent.com/proxy/awK9SNVsLBSTTrQev2B8Patf3fCbIGWa9mUi-pX_00Uk7H3BKBs2QAZpJAfXyb-MbRJaWkIzbXgR_IRJQsIuQRIWZBq7hSEwBrW0-08kltxbi0jIpKLqKedwQYq0RHB3QtK4tgi7zJCTmOwL6fc1WuckG0M=w408-h272-k-no',
  address: '600 Dr. M.L.K. Jr Blvd, Nashville, TN 37243',
  owner: 'The People',
  squareFeet: 8000,
};

const samplePins = [
  {
    name: 'Charlotte Ave & 6th Ave N',
    locationLat: 36.165606,
    locationLng: -86.782713,
    notes: 'Found in pavement',
    imageUrl: 'https://i.stack.imgur.com/3telo.jpg',
    wasFound: true,
    typeId: 'pinType15',
  },
  {
    name: 'U.S. Hwy 31 & Capital Towers',
    locationLat: 36.168388,
    locationLng: -86.785020,
    notes: 'Pin was not found',
    imageUrl: 'https://2.bp.blogspot.com/-euGUULQrEs0/TbFip5WDtvI/AAAAAAAADaY/lB7fUTqsKL4/s1600/002b.jpg',
    wasFound: false,
    typeId: 'pinType19',
  },
];

// Set while a new guest's sample data is being written, so Home can wait for
// it instead of rendering an empty list (the auth listener redirects to /home
// as soon as the anonymous sign-in completes, before seeding finishes).
let pendingSeed = Promise.resolve();

const seedGuestData = (uid) => propertyData.postProperty({ ...sampleProperty, uid })
  .then((response) => {
    const propertyId = response.data.name;
    return Promise.all(samplePins.map((pin) => pinData.postPin({ ...pin, propertyId, uid })));
  })
  .catch((err) => console.error('Unable to seed guest demo data: ', err));

const signInAsGuest = () => {
  // Assigned before signing in: the auth listener can mount Home before this
  // sign-in promise resolves, and Home must already see the pending seed.
  pendingSeed = firebase.auth().signInAnonymously()
    .then((credential) => {
      // Only a brand-new anonymous account gets sample data; a returning guest
      // (same browser, persisted session) never reaches this sign-in call.
      if (credential.additionalUserInfo && credential.additionalUserInfo.isNewUser) {
        return seedGuestData(credential.user.uid);
      }
      return undefined;
    });
  return pendingSeed;
};

const whenSeeded = () => pendingSeed;

const isGuest = () => {
  const user = firebase.auth().currentUser;
  return !!(user && user.isAnonymous);
};

export default { signInAsGuest, whenSeeded, isGuest };
