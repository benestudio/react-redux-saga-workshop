import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import styles from '../styles/Post.css';

const PostList = ({ posts }) => (
  <div className={styles.wrapper}>
    {posts.map(post => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
};

export default PostList;
