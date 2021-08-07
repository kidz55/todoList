import React from 'react';
import { shallow } from 'enzyme';
import AddTodoItem from '../src/components/AddTodoItem';

describe('AddTodoItem', () => {
  let tree;
  let onTaskAdd;
  beforeEach(() => {
    onTaskAdd = jest.fn();
    tree = shallow(
      <AddTodoItem onTaskAdd={onTaskAdd} isLoading={false} />,
    );
  });
  afterEach(() => {
    onTaskAdd.mockRestore();
  });
  it('should display the items', () => {
    expect(tree.find('[data-test-add-item]').exists()).toBeTruthy();
    expect(tree.find('[data-test-add-task-button]').exists()).toBeTruthy();
    expect(tree.find('[data-test-add-task-form]').exists()).toBeTruthy();
  });
  it('should emit onTaskAdd event when clicking the add button', () => {
    tree.find('[data-test-add-task-form]').simulate('update', { title: 'title', description: 'desc' });
    tree.find('[data-test-add-task-button]').simulate('click');
    expect(onTaskAdd.mock.calls.length).toBe(1);
    expect(onTaskAdd.mock.calls[0]).toEqual([{ description: 'desc', title: 'title' }]);
  });
  it('should not emit onTaskAdd event when clicking the add button with wrong form', () => {
    tree.find('[data-test-add-task-form]').simulate('error', true);
    tree.find('[data-test-add-task-button]').simulate('click');
    expect(onTaskAdd.mock.calls.length).toBe(0);
  });
});
