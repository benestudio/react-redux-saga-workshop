import {
  FETCH_POSTS_SUCCESS,
  FETCH_POSTS_ERROR,
  FILTER_POSTS,
  DELETE_POST_SUCCESS,
  COUNTDOWN_SECONDS,
  DELETE_POST_ERROR,
  FETCH_POSTS_REQUEST,
  FILTER_CHANGED,
  DELETE_POST_REQUEST,
  DELETE_POST_CANCELLED,
  DELETE_POST_CONFIRMED,
} from './types';

export const postsReceived = posts => ({ type: FETCH_POSTS_SUCCESS, payload: posts });

export const postsFailed = error => ({ type: FETCH_POSTS_ERROR, error });

export const filterPosts = filteredPosts => ({ type: FILTER_POSTS, payload: filteredPosts });

export const deletePostSuccess = remainingPosts => ({ type: DELETE_POST_SUCCESS, remainingPosts });

export const countdownSeconds = remainingSeconds => ({ type: COUNTDOWN_SECONDS, remainingSeconds });

export const filterChanged = name => ({ type: FILTER_CHANGED, name });

export const deletePostRequest = id => ({ type: DELETE_POST_REQUEST, id });

export const deletePostError = () => ({ type: DELETE_POST_ERROR });

export const deletePostCancelled = () => ({ type: DELETE_POST_CANCELLED });

export const deletePostConfirmed = () => ({ type: DELETE_POST_CONFIRMED });

export const fetchPosts = () => ({ type: FETCH_POSTS_REQUEST });
