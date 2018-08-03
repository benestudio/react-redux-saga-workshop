import React from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Post.css';

const Post = ({ post }) => (
  <div className={styles.post}>
    <div className={styles.id}>
      <b>ID:</b> {post.id}
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
