import axios from 'axios';
import { FETCH_POSTS } from './types';

export function fetchPosts() {
  console.log('asd');
  return (dispatch) => {
    axios
      .get('http://localhost:3001/posts')
      .then(({ data }) => dispatch({ type: FETCH_POSTS, payload: data }));
  };
}

export const asd = () => {};
