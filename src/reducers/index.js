import {
  FETCH_POSTS,
  POSTS_RECEIVED,
  POSTS_FAILED,
  FILTER_POSTS,
  DELETE_POST_SUCCESS,
  DELETE_POST_CANCELLED,
  DELETE_POST_REQUEST,
  DELETE_POST_ERROR,
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
    case DELETE_POST_REQUEST:
      return { ...state, removedPost: state.posts.find(p => p.id === action.id) };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(p => p.id !== action.id),
        filteredPosts: state.posts.filter(p => p.id !== action.id),
        removedPost: null,
      };
    case DELETE_POST_ERROR:
    case DELETE_POST_CANCELLED:
      return { ...state, removedPost: null };
    default:
      return { ...state };
  }
}
