import axios from 'axios';
import firebaseConfig from '../apiKeys.json';

const baseUrl = firebaseConfig.firebaseKeys.databaseURL;

const getPropertiesByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/properties.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const fbProperties = response.data;
      const properties = [];

      if (fbProperties) {
        Object.keys(fbProperties).forEach((fbId) => {
          fbProperties[fbId].id = fbId;
          properties.push(fbProperties[fbId]);
        });
      }
      resolve(properties);
    })
    .catch((err) => reject(err));
});

const getSingleProperty = (propertyId) => axios.get(`${baseUrl}/properties/${propertyId}.json`);

const postProperty = (newProperty) => axios.post(`${baseUrl}/properties.json`, newProperty);

const deleteProperty = (propertyId) => axios.delete(`${baseUrl}/properties/${propertyId}.json`);

const putProperty = (propertyId, updatedProperty) => axios.put(`${baseUrl}/properties/${propertyId}.json`, updatedProperty);

export default {
  getPropertiesByUid,
  getSingleProperty,
  postProperty,
  deleteProperty,
  putProperty,
};
