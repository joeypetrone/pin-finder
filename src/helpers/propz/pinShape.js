import PropTypes from 'prop-types';

const pinShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  locationLat: PropTypes.number.isRequired,
  locationLng: PropTypes.number.isRequired,
  notes: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  wasFound: PropTypes.bool.isRequired,
  typeId: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { pinShape };
