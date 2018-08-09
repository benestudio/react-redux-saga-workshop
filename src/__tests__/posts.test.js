import {
  call, put, select, race, take,
} from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { delay } from 'redux-saga';
import {
  fetchPostSaga, filterPosts, performDelete, countdownSaga,
} from '../sagas';
import { fetchPostsApi, deletePost } from '../actions';
import {
  POSTS_RECEIVED,
  POSTS_FAILED,
  FILTER_POSTS,
  DELETE_POST_CONFIRMED,
  DELETE_POST_SUCCESS,
  DELETE_POST_ERROR,
} from '../actions/types';
import { getPosts } from '../reducers';

describe('fetching posts', () => {
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

describe('delete post', () => {
  const deletedPostID = 2;
  const generator = cloneableGenerator(performDelete)(deletedPostID);

  test('succesful delete', () => {
    const clone = generator.clone();
    const mockPosts = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
    const mockPostsWithoutDeleted = [{ id: 1, name: 'Alice' }];

    expect(clone.next().value).toEqual(
      race({
        wait: call(countdownSaga),
        instantDelete: take(DELETE_POST_CONFIRMED),
      }),
    );

    expect(clone.next().value).toEqual(call(deletePost, deletedPostID));
    expect(clone.next().value).toEqual(select(getPosts));
    expect(clone.next(mockPosts).value).toEqual(
      put({ type: DELETE_POST_SUCCESS, remainingPosts: mockPostsWithoutDeleted }),
    );

    expect(clone.next().done).toBe(true);
  });

  test('error delete', () => {
    const clone = generator.clone();
    const error = {};

    expect(clone.next().value).toEqual(
      race({
        wait: call(countdownSaga),
        instantDelete: take(DELETE_POST_CONFIRMED),
      }),
    );

    expect(clone.throw(error).value).toEqual(put({ type: DELETE_POST_ERROR }));
    expect(clone.next().done).toBe(true);
  });
});
