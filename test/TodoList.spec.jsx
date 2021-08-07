import React from 'react';
import { mount } from 'enzyme';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Provider } from 'react-redux';
import TodoList from '../src/components/TodoList';
import TodoItem from '../src/components/TodoItem';
import configureStore from '../src/store/index';

describe('TodoList', () => {
  const store = configureStore();
  let tree;
  const tasks = [
    {
      id: '1234',
      title: 'my task 1',
      status: 'incompleted',
      description: 'description 1',
      dateCreated: 'August 19, 1975 23:17:30',
    },
    {
      id: '12345',
      title: 'my task 1',
      status: 'completed',
      description: 'description 2',
      dateCreated: 'August 19, 1975 23:17:30',
    },
    {
      id: '12346',
      title: 'my task 1',
      status: 'incompleted',
      description: 'description 3',
      dateCreated: 'August 19, 1975 23:17:30',
    },
  ];

  beforeEach(() => {
    store.dispatch({
      type: 'SET_TASKS',
      tasks,
    });
    tree = mount(
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  });
  it('should display the right amount of task', () => {
    expect(tree.find(TodoItem).length).toEqual(4);
  });
  it('should dispatch a add task action when clicking the last task', () => {
    const addButton = tree.find(AddCircleOutlineIcon);
    expect(addButton.length).toEqual(1);
    addButton.simulate('click');
    tree.update();
    expect(tree.find(TodoItem).length).toEqual(5);
  });
});
