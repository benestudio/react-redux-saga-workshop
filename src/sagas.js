import {
  put, call, takeEvery, select, takeLatest, race, take,
} from 'redux-saga/effects';
import { delay, eventChannel, END } from 'redux-saga';
import {
  FETCH_POSTS_REQUEST,
  FILTER_CHANGED,
  DELETE_POST_REQUEST,
  DELETE_POST_CANCELLED,
  DELETE_POST_ERROR,
  DELETE_POST_CONFIRMED,
} from './actions/types';
import { getPosts } from './reducers';
import { fetchPostsApi, deletePost } from './actions';
import { CANCEL_TIME } from './utils';
import {
  postsReceived,
  postsFailed,
  filterPosts,
  countdownSeconds,
  deletePostSuccess,
  deletePostError,
} from './actions/actionCreators';

const countdown = seconds => eventChannel((emitter) => {
  let secs = seconds;
  const iv = setInterval(() => {
    secs -= 1;
    if (secs > 0) {
      emitter(secs);
    } else {
      emitter(END);
    }
  }, 1000);
  return () => {
    clearInterval(iv);
  };
});

export function* fetchPostSaga() {


}

export function* filterPostsSaga({ name }) {

}

export function* countdownSaga() {

}

export function* performDelete(id) {

}

export function* removePost({ id }) {

}

export default function* rootSaga() {

}
