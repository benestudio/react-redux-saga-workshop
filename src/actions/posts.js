import axios from 'axios';
import { FETCH_POSTS, POSTS_RECEIVED } from './types';

export default function fetchPosts() {
  return (dispatch) => {
    dispatch({ type: FETCH_POSTS });
    axios
      .get('http://localhost:3001/posts')
      .then(({ data }) => dispatch({ type: POSTS_RECEIVED, payload: data }));
  };
}
