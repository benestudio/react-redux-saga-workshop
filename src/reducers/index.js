import { FETCH_POSTS, POSTS_RECEIVED } from '../actions/types';

const initialState = {
  posts: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, isLoading: true };
    case POSTS_RECEIVED:
      return { ...state, posts: action.payload, isLoading: false };
    default:
      return { ...state };
  }
}
