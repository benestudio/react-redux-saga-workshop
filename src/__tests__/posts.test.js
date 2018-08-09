import {
  call, put, select, race, take,
} from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';
import { delay } from 'redux-saga';
import {
  fetchPostSaga, filterPostsSaga, performDelete, countdownSaga,
} from '../sagas';
import { fetchPostsApi, deletePost } from '../actions';
import { DELETE_POST_CONFIRMED } from '../actions/types';
import { getPosts } from '../reducers';
import {
  postsReceived,
  postsFailed,
  filterPosts,
  deletePostSuccess,
  deletePostError,
} from '../actions/actionCreators';

describe('fetching posts', () => {
  const generator = cloneableGenerator(fetchPostSaga)();

  test('fetching posts successfully', () => {
    const clone = generator.clone();
    const posts = {};

    expect(clone.next().value).toEqual(call(fetchPostsApi));
    expect(clone.next(posts).value).toEqual(put(postsReceived(posts)));
    expect(clone.next().done).toBe(true);
  });

  test('fetching posts with error', () => {
    const clone = generator.clone();
    const error = {};

    expect(clone.next().value).toEqual(call(fetchPostsApi));
    expect(clone.throw(error).value).toEqual(put(postsFailed(error)));
    expect(clone.next().done).toBe(true);
  });
});

describe('search by name', () => {
  const searchParam = { name: 'Bob' };
  const generator = cloneableGenerator(filterPostsSaga)(searchParam);

  const usersMock = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Cindy' }];

  test('successful search', () => {
    const clone = generator.clone();

    expect(clone.next().value).toEqual(call(delay, 500));
    expect(clone.next().value).toEqual(select(getPosts));
    expect(clone.next(usersMock).value).toEqual(put(filterPosts([searchParam])));
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
    expect(clone.next(mockPosts).value).toEqual(put(deletePostSuccess(mockPostsWithoutDeleted)));

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

    expect(clone.throw(error).value).toEqual(put(deletePostError()));
    expect(clone.next().done).toBe(true);
  });
});
