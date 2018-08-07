import {
  put, call, takeEvery, select, takeLatest,
} from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  FETCH_POSTS,
  POSTS_RECEIVED,
  POSTS_FAILED,
  FILTER_CHANGED,
  FILTER_POSTS,
} from './actions/types';
import { getPosts } from './reducers';
import { fetchPostsApi } from './actions';

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

export default function* rootSaga() {
  yield takeEvery(FETCH_POSTS, fetchPostSaga);
  yield takeLatest(FILTER_CHANGED, filterPosts);
}
