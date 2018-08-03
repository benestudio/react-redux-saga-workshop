import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostList from './components/PostList';
import styles from './styles/Post.css';
import SpinnerStyle from './styles/Spinner.css';
import { FETCH_POSTS } from './actions/types';
import RefreshButton from './components/RefreshButton';

class App extends Component {
  componentDidMount() {
    this.refreshPosts();
  }

  onClick = () => this.refreshPosts();

  refreshPosts() {
    const { getPosts } = this.props;
    getPosts();
  }

  render() {
    const { posts, isLoading } = this.props;
    return (
      <div>
        <h1 className={styles.title}>Posts</h1>
        <RefreshButton onClick={this.onClick}>Refresh</RefreshButton>
        {isLoading ? <div className={SpinnerStyle.loader} /> : <PostList posts={posts} />}
      </div>
    );
  }
}

const mapStateToProps = state => ({ posts: state.posts, isLoading: state.isLoading });

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch({ type: FETCH_POSTS }),
});

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
  mapDispatchToProps,
)(App);
