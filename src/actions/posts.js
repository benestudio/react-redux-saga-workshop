import axios from 'axios';
import { FETCH_POSTS_REQUEST, FETCH_POSTS_SUCCESS } from './types';

// used by standard redux
export function fetchPosts() {
  return (dispatch) => {
    dispatch({ type: FETCH_POSTS_REQUEST });
    axios
      .get('http://localhost:3001/posts')
      .then(({ data }) => dispatch({ type: FETCH_POSTS_SUCCESS, payload: data }));
  };
}

// used by redux-saga
export function fetchPostsApi() {
  return axios.get('http://localhost:3001/posts').then(({ data }) => data);
}

export function deletePost(id) {
  return axios.delete(`http://localhost:3001/posts/${id}`);
}
