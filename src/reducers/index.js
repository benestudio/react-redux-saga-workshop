import {
  FETCH_POSTS,
  POSTS_RECEIVED,
  POSTS_FAILED,
  FILTER_POSTS,
  POST_DELETED,
  UNDO_CANCELLED,
} from '../actions/types';

const initialState = {
  posts: [],
  filteredPosts: [],
  isLoading: false,
  removedPost: null,
};

export const getPosts = state => state.posts;

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS:
      return { ...state, isLoading: true, error: null };
    case POSTS_RECEIVED:
      return {
        ...state,
        posts: action.payload,
        filteredPosts: action.payload,
        isLoading: false,
        error: null,
      };
    case POSTS_FAILED:
      return { ...state, isLoading: false, error: action.error };
    case FILTER_POSTS:
      return { ...state, filteredPosts: action.payload };
    case POST_DELETED:
      return {
        ...state,
        posts: action.payload,
        filteredPosts: action.payload,
        removedPost: action.removedPost,
      };
    case UNDO_CANCELLED:
      return { ...state, removedPost: null };
    default:
      return { ...state };
  }
}
