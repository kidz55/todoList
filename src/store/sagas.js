import {
  put, all, call, takeLatest, delay,
} from 'redux-saga/effects';
import Api from '../api';

export function* fetchTasks() {
  try {
    const { data: tasks } = yield call(Api.get, '/tasks');
    yield put({ type: 'SET_TASKS', tasks });
  } catch (error) {
    yield put({ type: 'TASK_REQ_FAILED', error });
  }
}

export function* updateTask(action) {
  yield delay(500);
  const { task } = action;
  try {
    yield call(Api.put, `/tasks/${task.id}`, task);
  } catch (error) {
    yield put({ type: 'TASK_REQ_FAILED', error });
  }
}

export function* addTask(action) {
  const { task } = action;
  try {
    yield call(Api.post, '/tasks', task);
    yield put({ type: 'GET_TASKS' });
  } catch (error) {
    yield put({ type: 'TASK_REQ_FAILED', error });
  }
}

export function* removeTask(action) {
  yield delay(500);
  const { task } = action;
  try {
    yield call(Api.delete, `/tasks/${task.id}`);
  } catch (error) {
    yield put({ type: 'TASK_REQ_FAILED', error });
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
