import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { useSelector, useDispatch } from 'react-redux';
import TodoItem from './TodoItem';

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
  const dispatch = useDispatch();

  const newTasks = [
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

  useEffect(() => {
    dispatch({ type: 'SET_TASKS', tasks: newTasks });
  }, []);

  const updateTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', task });
  };

  const addTask = (task) => {
    dispatch({ type: 'UPDATE_TASK', task });
  };

  return (
    <List className={classes.root}>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onTaskUpdate={updateTask}
        />
      ))}
      <TodoItem key="add-task" isNewTask onTaskUpdate={(tsk) => addTask(tsk)} />
    </List>
  );
};

export default TodoList;
