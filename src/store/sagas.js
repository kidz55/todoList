import {
  put, all, call, takeLatest,
} from 'redux-saga/effects';
import Api from '../api';

export function* fetchTasks() {
  yield put({ type: 'UPDATE_STATUS', status: 'syncing' });
  try {
    const { data: tasks } = yield call(Api.get, '/tasks');
    yield put({ type: 'SET_TASKS', tasks });
    yield put({ type: 'UPDATE_STATUS', status: 'synced' });
  } catch (error) {
    yield put({ type: 'TASK_REQ_FAILED', error });
    yield put({ type: 'UPDATE_STATUS', status: 'error' });
  }
}

export function* updateTask(action) {
  const { task } = action;
  yield put({ type: 'UPDATE_STATUS', status: 'syncing' });
  try {
    yield call(Api.put, `/tasks/${task.id}`, task);
    yield put({ type: 'UPDATE_STATUS', status: 'synced' });
  } catch (error) {
    yield put({ type: 'TASK_REQ_FAILED', error });
    yield put({ type: 'UPDATE_STATUS', status: 'error' });
  }
}

export function* addTask(action) {
  const { task } = action;
  yield put({ type: 'UPDATE_STATUS', status: 'syncing' });
  try {
    yield call(Api.post, '/tasks', task);
    yield put({ type: 'GET_TASKS' });
    yield put({ type: 'UPDATE_STATUS', status: 'synced' });
  } catch (error) {
    yield put({ type: 'TASK_REQ_FAILED', error });
    yield put({ type: 'UPDATE_STATUS', status: 'error' });
  }
}

export function* removeTask(action) {
  yield put({ type: 'UPDATE_STATUS', status: 'syncing' });
  const { task } = action;
  try {
    yield call(Api.delete, `/tasks/${task.id}`);
    yield put({ type: 'UPDATE_STATUS', status: 'synced' });
  } catch (error) {
    yield put({ type: 'TASK_REQ_FAILED', error });
    yield put({ type: 'UPDATE_STATUS', status: 'error' });
  }
}

function* watchFetchTasks() {
  yield takeLatest('GET_TASKS', fetchTasks);
}

function* watchUpdateTask() {
  yield takeLatest('UPDATE_TASK', updateTask);
}

function* watchAddTask() {
  yield takeLatest('ADD_TASK', addTask);
}

function* watchRemoveTask() {
  yield takeLatest('REMOVE_TASK', removeTask);
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchFetchTasks(), watchUpdateTask(), watchRemoveTask(), watchAddTask()]);
}
