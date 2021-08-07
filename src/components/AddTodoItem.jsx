import React, { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import propTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CircularProgress from '@material-ui/core/CircularProgress';
import Form from './Form';

const AddTodoItem = ({ onTaskAdd, isLoading }) => {
  const task = {
    title: '',
    status: 'incomplete',
    description: '',
  };
  const [draftTask, setDraftTask] = useState(task);
  const [error, setError] = useState(false);
  const [isDirty, setDirty] = useState(false);

  const resetTask = () => {
    setDraftTask(task);
  };
  return (
    <ListItem key="new-task" dense autoFocus>
      <ListItemIcon>
        {isLoading ? (
          <CircularProgress size={30} />
        ) : (
          <IconButton
            onClick={() => {
              setDirty(true);
              if (error) return;
              onTaskAdd(draftTask);
              resetTask();
              setDirty(false);
            }}
            aria-label="add"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        )}
      </ListItemIcon>
      <Form
        form={draftTask}
        onError={setError}
        isDirty={isDirty}
        onUpdate={setDraftTask}
      />
    </ListItem>
  );
};

AddTodoItem.defaultProps = {
  isLoading: false,
};

AddTodoItem.propTypes = {
  onTaskAdd: propTypes.func.isRequired,
  isLoading: propTypes.bool,
};

export default AddTodoItem;