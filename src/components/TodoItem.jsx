import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import Form from './Form';

const useStyles = makeStyles(() => ({
  completed: {
    textDecoration: 'line-through',
  },
}));

const TodoItem = ({ task, onTaskUpdate, onTaskRemove }) => {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [draftTask, setDraftTask] = useState(task);
  const [error, setError] = useState(false);
  const [isDirty, setDirty] = useState(false);

  useEffect(() => {
    setDraftTask(task);
  }, [task]);

  const toggleEditMode = () => {
    setEditing(!isEditing);
  };

  return (
    <ListItem key={draftTask.id} dense divider>
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={draftTask.status === 'completed'}
          tabIndex={-1}
          disableRipple
          onChange={() => {
            onTaskUpdate({
              ...draftTask,
              status:
                draftTask.status === 'completed' ? 'incomplete' : 'completed',
            });
          }}
          inputProps={{ 'aria-labelledby': draftTask.id }}
        />
      </ListItemIcon>
      {isEditing ? (
        <Form
          form={draftTask}
          onError={setError}
          isDirty={isDirty}
          onUpdate={setDraftTask}
        />
      ) : (
        <ListItemText
          className={draftTask.status === 'completed' ? classes.completed : ''}
          primary={draftTask.title}
          secondary={draftTask.description}
        />
      )}
      <ListItemSecondaryAction>
        <IconButton
          onClick={() => {
            onTaskRemove(draftTask);
          }}
        >
          <DeleteIcon />
        </IconButton>
        {isEditing ? (
          <IconButton
            onClick={() => {
              setDirty(true);
              if (error) return;
              setDirty(false);
              if (!isEqual(draftTask, task)) onTaskUpdate(draftTask);
              toggleEditMode();
            }}
            edge="end"
            aria-label="save"
          >
            <SaveAltIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => toggleEditMode()}
            edge="end"
            aria-label="edit"
          >
            <EditRoundedIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
};

TodoItem.propTypes = {
  onTaskUpdate: propTypes.func.isRequired,
  onTaskRemove: propTypes.func.isRequired,
  task: propTypes.shape({
    id: propTypes.string,
    title: propTypes.string,
    status: propTypes.string,
    description: propTypes.string,
  }).isRequired,
};

export default TodoItem;
