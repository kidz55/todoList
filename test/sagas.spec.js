import { put, call, select } from 'redux-saga/effects';
import {
  fetchTasks, updateTask, addTask, removeTask,
} from '../src/store/sagas';

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
  it('should run fetchTask correctly', () => {
    const generator = fetchTasks();
    let next = generator.next();

    expect(next.value.payload.args).toEqual(['/tasks']);
    expect(next.value.type).toEqual('CALL');

    next = generator.next(tasks);
    expect(next.value.payload).toEqual({
      action: {
        tasks,
        type: 'SET_TASKS',
      },
    });
    expect(next.value.type).toEqual('PUT');
  });
  it('should add task correctly', () => {
    const newTask = tasks[0];
    const generator = addTask(newTask);
    let next = generator.next();

    expect(next.value.payload.args).toEqual(['/tasks', newTask]);
    expect(next.value.type).toEqual('CALL');

    next = generator.next(newTask);
    expect(next.value.payload.action).toEqual({
      task: newTask,
      type: 'ADD_TASK',
    });
    expect(next.value.type).toEqual('PUT');
  });
  it('should update task correctly', () => {
    const updatedTask = tasks[0];
    const generator = updateTask(updatedTask);
    let next = generator.next();

    expect(next.value.payload.args).toEqual(['/tasks/1234', updatedTask]);
    expect(next.value.type).toEqual('CALL');

    next = generator.next(updatedTask);
    expect(next.value.payload.action).toEqual({
      task: updatedTask,
      type: 'UPDATE_TASK',
    });
    expect(next.value.type).toEqual('PUT');
  });
  it('should remove task correctly', () => {
    const toRemove = tasks[0];
    const generator = removeTask(toRemove);
    let next = generator.next();

    expect(next.value.payload.args).toEqual(['/tasks/1234']);
    expect(next.value.type).toEqual('CALL');

    next = generator.next(toRemove);
    expect(next.value.payload.action).toEqual({
      task: toRemove,
      type: 'REMOVE_TASK',
    });
    expect(next.value.type).toEqual('PUT');
  });
});
