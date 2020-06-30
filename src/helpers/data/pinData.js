import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getPinsByPropertyId = (propertyId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pins.json?orderBy="propertyId"&equalTo="${propertyId}"`)
    .then((response) => {
      const fbPins = response.data;
      const pins = [];

      if (fbPins) {
        Object.keys(fbPins).forEach((fbId) => {
          fbPins[fbId].id = fbId;
          pins.push(fbPins[fbId]);
        });
      }

      resolve(pins);
    })
    .catch((err) => reject(err));
});

const getAllPinTypes = () => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/pinTypes.json`)
    .then((response) => {
      const fbPinTypes = response.data;
      const pinTypes = [];

      if (fbPinTypes) {
        Object.keys(fbPinTypes).forEach((fbId) => {
          fbPinTypes[fbId].id = fbId;
          pinTypes.push(fbPinTypes[fbId]);
        });
      }

      resolve(pinTypes);
    })
    .catch((err) => reject(err));
});

const getPinType = (pinTypeId) => axios.get(`${baseUrl}/pinTypes/${pinTypeId}.json`);

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const postPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const putPin = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);

export default {
  getPinsByPropertyId,
  getAllPinTypes,
  getPinType,
  getSinglePin,
  postPin,
  deletePin,
  putPin,
};
