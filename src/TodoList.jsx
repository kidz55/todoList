import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './components/TodoItem';
import AddTodoItem from './components/AddTodoItem';
import Sync from './components/Sync';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TodoList = () => {
  const classes = useStyles();
  const tasks = useSelector((state) => Object.values(state.tasks));
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({ type: 'GET_TASKS' });
  }, []);

  const updateTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', task });
  };

  const createTask = async (task) => {
    setLoading(true);
    try {
      await dispatch({ type: 'ADD_TASK', task });
    } finally {
      setLoading(false);
    }
  };

  const removeTask = (task) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete task?')) {
      dispatch({ type: 'REMOVE_TASK', task });
    }
  };

  return (
    <div>
      <List className={classes.root}>
        {tasks.map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onTaskRemove={removeTask}
            onTaskUpdate={updateTask}
          />
        ))}
        <AddTodoItem
          key="add-task"
          isLoading={isLoading}
          onTaskAdd={createTask}
        />
      </List>
      <Sync status={status} />
    </div>
  );
};

export default TodoList;
