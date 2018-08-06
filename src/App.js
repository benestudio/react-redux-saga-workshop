import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostList from './components/PostList';
import styles from './styles/App.css';
import SpinnerStyle from './styles/Spinner.css';
import { FETCH_POSTS, FILTER_CHANGED } from './actions/types';
import RefreshButton from './components/RefreshButton';
import SearchInput from './components/SearchInput';

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

  refreshPosts() {
    const { getPosts } = this.props;
    getPosts();
  }

  render() {
    const { filteredPosts, isLoading, error } = this.props;
    const { name } = this.state;
    return (
      <div>
        <h1 className={styles.title}>Posts</h1>
        <RefreshButton onClick={this.onClick}>Refresh</RefreshButton>
        Filter by name:
        <SearchInput onChange={this.onFilterChanged} value={name} />
        {isLoading ? <div className={SpinnerStyle.loader} /> : <PostList posts={filteredPosts} />}
        {error && <div className={styles.error}>Something went wrong!</div>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filteredPosts: state.filteredPosts,
  isLoading: state.isLoading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  getPosts: () => dispatch({ type: FETCH_POSTS }),
  filterPosts: name => dispatch({ type: FILTER_CHANGED, name }),
});

App.propTypes = {
  filteredPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string,
      name: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
  getPosts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.shape({}),
  filterPosts: PropTypes.func.isRequired,
};

App.defaultProps = {
  filteredPosts: [],
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
