import PropTypes from 'prop-types';

const propertyShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  centerLat: PropTypes.number.isRequired,
  centerLng: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  squareFeet: PropTypes.number.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { propertyShape };
