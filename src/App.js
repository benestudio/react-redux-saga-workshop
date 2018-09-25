import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostList from './components/PostList';
import styles from './styles/App.css';
import SpinnerStyle from './styles/Spinner.css';
import RefreshButton from './components/RefreshButton';
import SearchInput from './components/SearchInput';
import postPropType from './utils';
import RemovedPostWarning from './components/RemovedPostWarning';
import {
  // fetchPosts,
  filterChanged,
  deletePostRequest,
  deletePostCancelled,
  deletePostConfirmed,
} from './actions/actionCreators';
import { fetchPosts } from './actions';

class App extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    this.refreshPosts();
  }

  onRefreshClick = () => {
    this.refreshPosts();
    this.setState({ name: '' });
  };

  onFilterChanged = (e) => {
    const { filterPosts } = this.props;
    this.setState({ name: e.target.value });
    filterPosts(e.target.value);
  };

  onDeleteClick = (id) => {
    const { tryDeletePost } = this.props;
    if (confirm(`Delete post with ID: ${id}`)) {
      tryDeletePost(id);
    }
  };

  confirmDelete = () => {
    const { deleteConfirmed } = this.props;
    deleteConfirmed();
    this.setState({ name: '' });
  };

  cancelDelete = () => {
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
        <RefreshButton onClick={this.onRefreshClick}>Refresh</RefreshButton>
        Filter by name:
        <SearchInput onChange={this.onFilterChanged} value={name} />
        {removedPost && (
          <RemovedPostWarning
            post={removedPost}
            confirmDelete={this.confirmDelete}
            cancelDelete={this.cancelDelete}
          />
        )}
        {isLoading ? (
          <div className={SpinnerStyle.loader} />
        ) : (
          <PostList
            removedPost={removedPost}
            posts={filteredPosts}
            deletePost={this.onDeleteClick}
          />
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

const mapDispatchToProps = {
  getPosts: fetchPosts,
  filterPosts: filterChanged,
  tryDeletePost: deletePostRequest,
  cancel: deletePostCancelled,
  deleteConfirmed: deletePostConfirmed,
};

App.propTypes = {
  filteredPosts: PropTypes.arrayOf(postPropType),
  getPosts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  filterPosts: PropTypes.func.isRequired,
  tryDeletePost: PropTypes.func.isRequired,
  removedPost: postPropType,
  deleteConfirmed: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};

App.defaultProps = {
  filteredPosts: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
