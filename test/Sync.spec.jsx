import React from 'react';
import { shallow } from 'enzyme';
import Sync from '../src/components/Sync';

describe('Sync', () => {
  let tree;
  it('should display the synced status', () => {
    tree = shallow(
      <Sync status="synced" />,
    );
    expect(tree.find('span').text()).toEqual('Synced');
  });
  it('should display the unsynced status', () => {
    tree = shallow(
      <Sync status="unsynced" />,
    );
    expect(tree.find('span').text()).toEqual('Unsynced');
  });
  it('should display the error status', () => {
    tree = shallow(
      <Sync status="error" />,
    );
    expect(tree.find('span').text()).toEqual('Error during syncing');
  });
  it('should display the syncing status', () => {
    tree = shallow(
      <Sync status="syncing" />,
    );
    expect(tree.find('span').text()).toEqual('Syncing');
  });
});
