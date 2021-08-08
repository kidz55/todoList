import React from 'react';
import { shallow } from 'enzyme';
import TodoItem from '../src/components/TodoItem';

describe('TodoItem', () => {
  let tree;
  let onTaskUpdate;
  let onTaskRemove;
  beforeEach(() => {
    const task = {
      title: 'task',
      description: 'desc',
      id: '1',
      status: 'incomplete',
    };
    onTaskUpdate = jest.fn();
    onTaskRemove = jest.fn();
    tree = shallow(
      <TodoItem task={task} onTaskUpdate={onTaskUpdate} onTaskRemove={onTaskRemove} />,
    );
  });
  afterEach(() => {
    onTaskUpdate.mockRestore();
    onTaskRemove.mockRestore();
  });
  it('should display the right items in view mode', () => {
    expect(tree.find('[data-test-item-todo]').exists()).toBeTruthy();
    expect(tree.find('[data-test-item-checkbox]').exists()).toBeTruthy();
    expect(tree.find('[data-text-item-text]').exists()).toBeTruthy();
    expect(tree.find('[data-text-item-form]').exists()).toBeFalsy();
    expect(tree.find('[data-text-item-remove]').exists()).toBeTruthy();
    expect(tree.find('[data-text-item-edit]').exists()).toBeTruthy();
    expect(tree.find('[data-text-item-save]').exists()).toBeFalsy();
  });
  it('should display the right items in edit mode', () => {
    tree.find('[data-text-item-edit]').simulate('click');
    expect(tree.find('[data-test-item-todo]').exists()).toBeTruthy();
    expect(tree.find('[data-test-item-checkbox]').exists()).toBeTruthy();
    expect(tree.find('[data-text-item-text]').exists()).toBeFalsy();
    expect(tree.find('[data-text-item-form]').exists()).toBeTruthy();
    expect(tree.find('[data-text-item-remove]').exists()).toBeTruthy();
    expect(tree.find('[data-text-item-edit]').exists()).toBeFalsy();
    expect(tree.find('[data-text-item-save]').exists()).toBeTruthy();
  });
  it('should emit onUpdateTask when toggle the checkbox', () => {
    tree.find('[data-test-item-checkbox]').simulate('change', {});
    expect(onTaskUpdate.mock.calls.length).toBe(1);
    expect(onTaskUpdate.mock.calls[0]).toEqual([{
      id: '1', title: 'task', status: 'completed', description: 'desc',
    }]);
  });
  it('should not emit onTaskUpdate event when clicking the add button with wrong form', () => {
    tree.find('[data-text-item-edit]').simulate('click');
    tree.find('[data-text-item-form]').simulate('error', true);
    tree.find('[data-text-item-save]').simulate('click');
    expect(onTaskUpdate.mock.calls.length).toBe(0);
  });
  it('should emit onTaskUpdate event when clicking the add button', () => {
    tree.find('[data-text-item-edit]').simulate('click');
    tree.find('[data-text-item-form]').simulate('update', {
      id: '1', title: 'new', status: 'completed', description: 'task',
    });
    tree.find('[data-text-item-save]').simulate('click');
    expect(onTaskUpdate.mock.calls.length).toBe(1);
    expect(onTaskUpdate.mock.calls[0]).toEqual([{
      id: '1', title: 'new', status: 'completed', description: 'task',
    }]);
  });
});
