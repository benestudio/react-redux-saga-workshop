import PropTypes from 'prop-types';

const postPropType = PropTypes.shape({
  id: PropTypes.number,
  email: PropTypes.string,
  name: PropTypes.string,
  text: PropTypes.string,
});

export default postPropType;
