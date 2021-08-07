import React from 'react';
import { shallow } from 'enzyme';
import Form from '../src/components/Form';

describe('Form', () => {
  let tree;
  let onUpdate;
  let onError;
  beforeEach(() => {
    const form = { title: 'truc', description: 'muche' };
    onUpdate = jest.fn();
    onError = jest.fn();
    tree = shallow(
      <Form form={form} onUpdate={onUpdate} onError={onError} isDirty={false} />,
    );
  });
  afterEach(() => {
    onUpdate.mockRestore();
    onUpdate.mockRestore();
  });
  it('should display two text fields', () => {
    expect(tree.find('[data-test-text-field-title]').exists()).toBeTruthy();
    expect(tree.find('[data-test-text-field-desc]').exists()).toBeTruthy();
  });
  it('should emit onUpdate event when typing a title', () => {
    tree.find('[data-test-text-field-title]').simulate('change', { target: { value: 'text' } });
    expect(onUpdate.mock.calls.length).toBe(1);
    expect(onUpdate.mock.calls[0]).toEqual([{ description: 'muche', title: 'text' }]);
  });
  it('should emit onUpdate event when typing a description', () => {
    tree.find('[data-test-text-field-desc]').simulate('change', { target: { value: 'text' } });
    expect(onUpdate.mock.calls.length).toBe(1);
    expect(onUpdate.mock.calls[0]).toEqual([{ description: 'text', title: 'truc' }]);
  });
});
