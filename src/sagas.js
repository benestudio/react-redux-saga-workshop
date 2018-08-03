import { put, call, takeEvery } from 'redux-saga/effects';
import { FETCH_POSTS, POSTS_RECEIVED } from './actions/types';
import { fetchPostsApi } from './actions';

function* fetchPostSaga() {
  const posts = yield call(fetchPostsApi);

  yield put({ type: POSTS_RECEIVED, payload: posts });
}

export default function* watchPostSage() {
  yield takeEvery(FETCH_POSTS, fetchPostSaga);
}
