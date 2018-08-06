import { call, put } from 'redux-saga/effects';
import { fetchPostSaga } from '../sagas';
import { fetchPostsApi } from '../actions';
import { POSTS_RECEIVED, POSTS_FAILED } from '../actions/types';
import { cloneableGenerator } from '../../node_modules/redux-saga/utils';

export default describe('posts', () => {
  const generator = cloneableGenerator(fetchPostSaga)();

  test('fetching posts successfully', () => {
    const clone = generator.clone();
    const posts = {};

    expect(clone.next().value).toEqual(call(fetchPostsApi));
    expect(clone.next(posts).value).toEqual(put({ type: POSTS_RECEIVED, payload: posts }));
    expect(clone.next().done).toBe(true);
  });

  test('fetching posts with error', () => {
    const clone = generator.clone();
    const error = {};

    expect(clone.next().value).toEqual(call(fetchPostsApi));
    expect(clone.throw(error).value).toEqual(put({ type: POSTS_FAILED, error }));
    expect(clone.next().done).toBe(true);
  });
});
