import { put, call, takeEvery } from 'redux-saga/effects';
import { FETCH_POSTS, POSTS_RECEIVED, POSTS_FAILED } from './actions/types';
import { fetchPostsApi } from './actions';

function* fetchPostSaga() {
  try {
    const posts = yield call(fetchPostsApi);
    yield put({ type: POSTS_RECEIVED, payload: posts });
  } catch (error) {
    yield put({ type: POSTS_FAILED, error });
  }
}

export default function* watchPostSaga() {
  yield takeEvery(FETCH_POSTS, fetchPostSaga);
}
