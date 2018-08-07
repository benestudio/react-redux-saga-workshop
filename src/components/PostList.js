import React from 'react';
import PropTypes from 'prop-types';
import Post from './Post';
import styles from '../styles/Post.css';
import postPropType from '../utils';

const PostList = ({ posts, deletePost }) => (
  <div className={styles.wrapper}>
    {posts.map(post => (
      <Post key={post.id} post={post} deletePost={deletePost} />
    ))}
  </div>
);

PostList.propTypes = {
  posts: PropTypes.arrayOf(postPropType).isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default PostList;
