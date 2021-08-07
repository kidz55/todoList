import React from 'react';
import { mount } from 'enzyme';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { Provider } from 'react-redux';
import TodoList from '../src/TodoList';
import TodoItem from '../src/components/TodoItem';
import configureStore from '../src/store/index';
import AddTodoItem from '../src/components/AddTodoItem';
import Sync from '../src/components/Sync';

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
      </Provider>,
    );
  });
  it('should match snapshot', () => {
    expect(tree).toMatchSnapshot();
  });
  it('should display the right components', () => {
    expect(tree.find(TodoItem).length).toEqual(3);
    expect(tree.find(AddTodoItem).length).toEqual(1);
    expect(tree.find(Sync).length).toEqual(1);
  });
});
