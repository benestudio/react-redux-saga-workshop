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

  test('fetching posts successfully', () => false);

  test('fetching posts with error', () => false);
});

describe('search by name', () => {
  const searchParam = { name: 'Bob' };
  const generator = cloneableGenerator(filterPostsSaga)(searchParam);

  const usersMock = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Cindy' }];

  test('successful search', () => false);
});

describe('delete post', () => {
  const deletedPostID = 2;
  const generator = cloneableGenerator(performDelete)(deletedPostID);

  test('succesful delete', () => false);

  test('error delete', () => {
    const clone = generator.clone();
    const error = {};
    return false;
  });
});
