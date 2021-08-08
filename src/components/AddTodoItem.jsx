import React, { useState } from 'react';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import propTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Form from './Form';

const AddTodoItem = ({ onTaskAdd }) => {
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
    <ListItem key="new-task" data-test-add-item>
      <Form
        data-test-add-task-form
        form={draftTask}
        onError={setError}
        isDirty={isDirty}
        onUpdate={setDraftTask}
      />
      <ListItemSecondaryAction>
        <IconButton
          data-test-add-task-button
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
      </ListItemSecondaryAction>
    </ListItem>
  );
};

AddTodoItem.propTypes = {
  onTaskAdd: propTypes.func.isRequired,
};

export default AddTodoItem;
