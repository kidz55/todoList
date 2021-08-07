import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import TodoItem from './components/TodoItem';
import AddTodoItem from './components/AddTodoItem';
import Sync from './components/Sync';

const useStyles = makeStyles((theme) => ({
  list: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

const TodoList = () => {
  const classes = useStyles();
  const tasks = useSelector((state) => Object.values(state.tasks));
  const status = useSelector((state) => state.status);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: 'GET_TASKS' });
  }, [dispatch]);

  const updateTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', task });
  };

  const createTask = async (task) => {
    dispatch({ type: 'ADD_TASK', task });
  };

  const removeTask = (task) => {
    // eslint-disable-next-line no-alert
    if (window.confirm('Are you sure you want to delete task?')) {
      dispatch({ type: 'REMOVE_TASK', task });
    }
  };
  const handleFilterChange = (event) => {
    const filter = event.target.checked ? 'expired' : '';
    dispatch({ type: 'GET_TASKS', filter });
  };

  return (
    <div>
      <div className={classes.header}>
        <h1>TODO LIST</h1>
        <div>
          <Checkbox onChange={handleFilterChange} />
          filter expired
        </div>
      </div>

      <List className={classes.list}>
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
          isLoading={status === 'syncing'}
          onTaskAdd={createTask}
        />
      </List>
      <Sync status={status} />
    </div>
  );
};

export default TodoList;
