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
  try {
    const posts = yield call(fetchPostsApi);
    yield put(postsReceived(posts));
  } catch (error) {
    yield put(postsFailed(error));
  }
}

export function* filterPostsSaga({ name }) {
  yield call(delay, 500);

  const searchName = name.toLowerCase().trim();
  const posts = yield select(getPosts);
  const filteredPost = posts.filter(post => post.name.toLowerCase().includes(searchName));
  yield put(filterPosts(filteredPost));
}

export function* countdownSaga() {
  const chan = yield call(countdown, CANCEL_TIME);
  try {
    while (true) {
      const remainingSeconds = yield take(chan);
      yield put(countdownSeconds(remainingSeconds));
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

    const posts = yield select(getPosts);
    const remainingPosts = posts.filter(post => post.id !== id);

    yield put(deletePostSuccess(remainingPosts));
  } catch (error) {
    yield put(deletePostError(error));
  }
}

export function* removePost({ id }) {
  yield race({
    response: call(performDelete, id),
    cancelDeleting: take([DELETE_POST_CANCELLED, DELETE_POST_ERROR]),
  });
}

export default function* rootSaga() {
  yield takeEvery(FETCH_POSTS_REQUEST, fetchPostSaga);
  yield takeLatest(FILTER_CHANGED, filterPostsSaga);
  yield takeLatest(DELETE_POST_REQUEST, removePost);
}
