import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import propTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import TodoItem from './TodoItem';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const TodoList = ({ tasks }) => {
  const classes = useStyles();

  const handleToggle = (task) => () => {
    console.log(task);
    // go to saga
  };

  const addTask = () => {
    // go to saga
  };

  return (
    <List className={classes.root}>
      {tasks.map((task) => (
        <TodoItem key={task.id} task={task} updateTask={handleToggle(task)} />
      ))}
      <ListItem key="add-item" dense button onClick={addTask} />
    </List>
  );
};
TodoList.defaultProps = {
  tasks: [
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
  ],
};

TodoList.propTypes = {
  tasks: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      status: propTypes.string,
      description: propTypes.string,
      dateCreated: propTypes.string,
    })
  ),
};

export default TodoList;
