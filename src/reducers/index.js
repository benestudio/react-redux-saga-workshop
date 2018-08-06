import { FETCH_POSTS, POSTS_RECEIVED, POSTS_FAILED } from '../actions/types';

const initialState = {
  posts: [],
  isLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, isLoading: true, error: null };
    case POSTS_RECEIVED:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
        error: null,
      };
    case POSTS_FAILED:
      return { ...state, isLoading: false, error: action.error };
    default:
      return { ...state };
  }
}
