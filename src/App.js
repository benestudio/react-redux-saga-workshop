import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostList from './components/PostList';
import fetchPosts from './actions/posts';
import styles from './components/Post.css';
import SpinnerStyle from './Spinner.css';

class App extends Component {
  componentDidMount() {
    const { getPosts } = this.props;
    getPosts();
  }

  render() {
    const { posts, isLoading } = this.props;
    return (
      <div>
        <h1 className={styles.title}>Posts</h1>
        {isLoading ? <div className={SpinnerStyle.loader} /> : <PostList posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({ posts: state.posts, isLoading: state.isLoading });

App.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      text: PropTypes.string,
    }),
  ).isRequired,
  getPosts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(
  mapStateToProps,
  { getPosts: fetchPosts },
)(App);
