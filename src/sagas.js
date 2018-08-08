import {
  put, call, takeEvery, select, takeLatest, race, take,
} from 'redux-saga/effects';
import { delay, eventChannel, END } from 'redux-saga';
import {
  FETCH_POSTS,
  POSTS_RECEIVED,
  POSTS_FAILED,
  FILTER_CHANGED,
  FILTER_POSTS,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_CANCELLED,
  DELETE_POST_ERROR,
  DELETE_POST_CONFIRMED,
  COUNTDOWN_SECONDS,
} from './actions/types';
import { getPosts } from './reducers';
import { fetchPostsApi, deletePost } from './actions';
import { CANCEL_TIME } from './utils';

const countdown = seconds => eventChannel((emitter) => {
  let secs = seconds;
  const iv = setInterval(() => {
    secs -= 1;
    if (secs > 0) {
      emitter(secs);
    } else {
      // this causes the channel to close
      emitter(END);
    }
  }, 1000);
    // The subscriber must return an unsubscribe function
  return () => {
    clearInterval(iv);
  };
});

export function* fetchPostSaga() {
  try {
    const posts = yield call(fetchPostsApi);
    yield put({ type: POSTS_RECEIVED, payload: posts });
  } catch (error) {
    yield put({ type: POSTS_FAILED, error });
  }
}

export function* filterPosts({ name }) {
  yield call(delay, 500);

  const searchName = name.toLowerCase().trim();
  const posts = yield select(getPosts);
  const filteredPost = posts.filter(post => post.name.toLowerCase().includes(searchName));
  yield put({ type: FILTER_POSTS, payload: filteredPost });
}

function* countdownSaga() {
  const chan = yield call(countdown, CANCEL_TIME);
  try {
    while (true) {
      const remainingSeconds = yield take(chan);
      yield put({ type: COUNTDOWN_SECONDS, remainingSeconds });
    }
  } finally {
    chan.close();
  }
}

export function* performDelete(id) {
  try {
    yield race({
      wait: call(countdownSaga),
      instantDelete: take(DELETE_POST_CONFIRMED),
    });

    yield call(deletePost, id);

    yield put({ type: DELETE_POST_SUCCESS, id });
  } catch (error) {
    yield put({ type: DELETE_POST_ERROR });
  }
}

export function* removePost({ id }) {
  yield race({
    response: call(performDelete, id),
    cancelDeleting: take([DELETE_POST_CANCELLED, DELETE_POST_ERROR]),
  });
}

export default function* rootSaga() {
  yield takeEvery(FETCH_POSTS, fetchPostSaga);
  yield takeLatest(FILTER_CHANGED, filterPosts);
  yield takeLatest(DELETE_POST_REQUEST, removePost);
}
