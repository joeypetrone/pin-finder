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

const getSinglePin = (pinId) => axios.get(`${baseUrl}/pins/${pinId}.json`);

const postPin = (newPin) => axios.post(`${baseUrl}/pins.json`, newPin);

const deletePin = (pinId) => axios.delete(`${baseUrl}/pins/${pinId}.json`);

const putPin = (pinId, updatedPin) => axios.put(`${baseUrl}/pins/${pinId}.json`, updatedPin);

export default {
  getPinsByPropertyId,
  getSinglePin,
  postPin,
  deletePin,
  putPin,
};
