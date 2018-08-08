import {
  put, call, takeEvery, select, takeLatest, race, take,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
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
} from './actions/types';
import { getPosts } from './reducers';
import { fetchPostsApi, deletePost } from './actions';

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

export function* performDelete(id) {
  try {
    yield race({
      wait: call(delay, 5000),
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
