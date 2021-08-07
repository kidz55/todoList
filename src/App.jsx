import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import './App.css';
import TodoList from './TodoList';

const store = configureStore();
const App = () => (
  <Provider store={store}>
    <div className="App">
      <TodoList />
    </div>
  </Provider>
);

export default hot(module)(App);
