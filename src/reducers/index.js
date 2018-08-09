import {
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FILTER_POSTS,
  DELETE_POST_SUCCESS,
  DELETE_POST_CANCELLED,
  DELETE_POST_REQUEST,
  DELETE_POST_ERROR,
  COUNTDOWN_SECONDS,
} from '../actions/types';
import { CANCEL_TIME } from '../utils';

const initialState = {
  posts: [],
  filteredPosts: [],
  isLoading: false,
  removedPost: null,
  remainingSeconds: CANCEL_TIME,
};

export const getPosts = state => state.posts;

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return { ...state, isLoading: true, error: null };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        filteredPosts: action.payload,
        isLoading: false,
        error: null,
      };
    case FETCH_POSTS_ERROR:
      return { ...state, isLoading: false, error: action.error };
    case FILTER_POSTS:
      return { ...state, filteredPosts: action.payload };
    case DELETE_POST_REQUEST:
      return { ...state, removedPost: state.posts.find(p => p.id === action.id) };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: action.remainingPosts,
        filteredPosts: action.remainingPosts,
        removedPost: null,
        remainingSeconds: CANCEL_TIME,
      };
    case DELETE_POST_ERROR:
    case DELETE_POST_CANCELLED:
      return { ...state, removedPost: null, remainingSeconds: CANCEL_TIME };
    case COUNTDOWN_SECONDS:
      return { ...state, remainingSeconds: action.remainingSeconds };
    default:
      return { ...state };
  }
}
