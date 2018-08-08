import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Post.css';
import postPropType from '../utils';
import StyledPost from './StyledPost';

const Post = ({ post, deletePost, removed }) => (
  <StyledPost removed={removed}>
    <div>
      <b>ID:</b> {post.id}
      <i
        className={`fas fa-trash ${styles.delete}`}
        role="button"
        tabIndex={0}
        onClick={() => deletePost(post.id)}
      />
    </div>
    <div>
      <b>Email:</b> {post.email}
    </div>
    <div>
      <b>Name: </b> {post.name}
    </div>
    <section>
      <b>Text:</b>
      <div className={styles.text}>{post.text}</div>
    </section>
  </StyledPost>
);

Post.propTypes = {
  post: postPropType,
  deletePost: PropTypes.func.isRequired,
  removed: PropTypes.bool,
};

export default Post;
