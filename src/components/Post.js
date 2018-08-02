import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => (
  <div>
    <div>{post.id}</div>
    <div>{post.email}</div>
    <div>{post.name}</div>
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    email: PropTypes.string,
    name: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default Post;
