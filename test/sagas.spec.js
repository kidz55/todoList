import { runSaga } from 'redux-saga';
import {
  fetchTasks, updateTask, addTask, removeTask,
} from '../src/store/sagas';
import Api from '../src/api/index';

describe('sagas', () => {
  const tasks = [
    {
      id: '1234',
      title: 'my task 1',
      status: 'incompleted',
      description: 'description 1',
      dateCreated: 'August 19, 1975 23:17:30',
    },
  ];
  it('should run fetchTask correctly', async () => {
    const httpRequest = jest.spyOn(Api, 'get')
      .mockResolvedValue({
        data: {
          rows: tasks,
          count: 1,
        },
      });

    const dispatched = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, fetchTasks, { type: 'GET_TASKS', query: {} });
    expect(httpRequest).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual({ status: 'syncing', type: 'UPDATE_STATUS' });
    expect(dispatched[1]).toEqual({ tasks: { rows: tasks, count: 1 }, type: 'SET_TASKS' });
    httpRequest.mockClear();
  });
  it('should add task correctly', async () => {
    const httpRequest = jest.spyOn(Api, 'post')
      .mockResolvedValue({
        data: tasks[0],
      });
    const dispatched = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, addTask, { task: tasks[0] });

    expect(httpRequest).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual({ status: 'syncing', type: 'UPDATE_STATUS' });
    expect(dispatched[1]).toEqual({ type: 'GET_TASKS' });
    httpRequest.mockClear();
  });
  it('should update task correctly', async () => {
    const httpRequest = jest.spyOn(Api, 'put')
      .mockResolvedValue({
        data: tasks[0],
      });
    const dispatched = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, updateTask, { task: tasks[0] });

    expect(httpRequest).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual({ status: 'syncing', type: 'UPDATE_STATUS' });
    httpRequest.mockClear();
  });
  it('should remove task correctly', async () => {
    const httpRequest = jest.spyOn(Api, 'delete')
      .mockResolvedValue({
        data: tasks[0],
      });
    const dispatched = [];
    await runSaga({
      dispatch: (action) => dispatched.push(action),
    }, removeTask, { task: tasks[0] });

    expect(httpRequest).toHaveBeenCalledTimes(1);
    expect(dispatched[0]).toEqual({ status: 'syncing', type: 'UPDATE_STATUS' });
    httpRequest.mockClear();
  });
});
