import {
  POSTS_RECEIVED,
  POSTS_FAILED,
  FILTER_POSTS,
  DELETE_POST_SUCCESS,
  COUNTDOWN_SECONDS,
  DELETE_POST_ERROR,
  FETCH_POSTS,
  FILTER_CHANGED,
  DELETE_POST_REQUEST,
  DELETE_POST_CANCELLED,
  DELETE_POST_CONFIRMED,
} from './types';

export const postsReceived = posts => ({ type: POSTS_RECEIVED, payload: posts });

export const postsFailed = error => ({ type: POSTS_FAILED, error });

export const filterPosts = filteredPosts => ({ type: FILTER_POSTS, payload: filteredPosts });

export const deletePostSuccess = remainingPosts => ({ type: DELETE_POST_SUCCESS, remainingPosts });

export const countdownSeconds = remainingSeconds => ({ type: COUNTDOWN_SECONDS, remainingSeconds });

export const filterChanged = name => ({ type: FILTER_CHANGED, name });

export const deletePostRequest = id => ({ type: DELETE_POST_REQUEST, id });

export const deletePostError = () => ({ type: DELETE_POST_ERROR });

export const deletePostCancelled = () => ({ type: DELETE_POST_CANCELLED });

export const deletePostConfirmed = () => ({ type: DELETE_POST_CONFIRMED });

export const fetchPosts = () => ({ type: FETCH_POSTS });
