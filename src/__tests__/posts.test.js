import { call, put, select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { delay } from 'redux-saga';
import { fetchPostSaga, filterPosts } from '../sagas';
import { fetchPostsApi } from '../actions';
import { POSTS_RECEIVED, POSTS_FAILED, FILTER_POSTS } from '../actions/types';
import { getPosts } from '../reducers';

describe('posts', () => {
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

describe('search by name', () => {
  const searchParam = { name: 'Bob' };
  const generator = cloneableGenerator(filterPosts)(searchParam);

  const usersMock = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Cindy' }];

  test('successful search', () => {
    const clone = generator.clone();

    expect(clone.next().value).toEqual(call(delay, 500));
    expect(clone.next().value).toEqual(select(getPosts));
    expect(clone.next(usersMock).value).toEqual(
      put({ type: FILTER_POSTS, payload: [searchParam] }),
    );
    expect(clone.next().done).toBe(true);
  });
});
