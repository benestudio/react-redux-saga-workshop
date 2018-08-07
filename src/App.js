import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostList from './components/PostList';
import styles from './styles/App.css';
import SpinnerStyle from './styles/Spinner.css';
import {
  FETCH_POSTS,
  FILTER_CHANGED,
  DELETE_POST,
  UNDO_CONFIRMED,
  UNDO_CANCELLED,
} from './actions/types';
import RefreshButton from './components/RefreshButton';
import SearchInput from './components/SearchInput';
import postPropType from './utils';
import RemovedPostWarning from './components/RemovedPostWarning';

class App extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.refreshPosts();
  }

  onClick = () => {
    this.refreshPosts();
    this.setState({ name: '' });
  };

  onFilterChanged = (e) => {
    const { filterPosts } = this.props;
    this.setState({ name: e.target.value });
    filterPosts(e.target.value);
  };

  deletePost = (id) => {
    const { removePost } = this.props;
    if (confirm(`Delete post with ID: ${id}`)) {
      removePost(id);
    }
  };

  undo = () => {
    const { undo } = this.props;
    undo();
  };

  cancel = () => {
    const { cancel } = this.props;
    cancel();
  };

  refreshPosts() {
    const { getPosts } = this.props;
    getPosts();
  }

  render() {
    const {
      filteredPosts, isLoading, error, removedPost,
    } = this.props;
    const { name } = this.state;
    return (
      <div>
        <h1 className={styles.title}>Posts</h1>
        <RefreshButton onClick={this.onClick}>Refresh</RefreshButton>
        Filter by name:
        <SearchInput onChange={this.onFilterChanged} value={name} />
        {removedPost && (
          <RemovedPostWarning post={removedPost} undo={this.undo} cancel={this.cancel} />
        )}
        {isLoading ? (
          <div className={SpinnerStyle.loader} />
        ) : (
          <PostList posts={filteredPosts} deletePost={this.deletePost} />
        )}
        {error && <div className={styles.error}>Something went wrong!</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filteredPosts: state.filteredPosts,
  isLoading: state.isLoading,
  error: state.error,
  removedPost: state.removedPost,
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch({ type: FETCH_POSTS }),
  filterPosts: name => dispatch({ type: FILTER_CHANGED, name }),
  removePost: id => dispatch({ type: DELETE_POST, id }),
  undo: () => dispatch({ type: UNDO_CONFIRMED }),
  cancel: () => dispatch({ type: UNDO_CANCELLED }),
});

App.propTypes = {
  filteredPosts: PropTypes.arrayOf(postPropType),
  getPosts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  filterPosts: PropTypes.func.isRequired,
  removePost: PropTypes.func.isRequired,
  removedPost: postPropType,
  undo: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

App.defaultProps = {
  filteredPosts: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
