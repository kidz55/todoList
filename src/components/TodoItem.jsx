import React, { useState, useEffect } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Checkbox from '@material-ui/core/Checkbox';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import Form from './Form';

const useStyles = makeStyles(() => ({
  completed: {
    textDecoration: 'line-through',
  },
}));

const TodoItem = ({ task, onTaskUpdate, isNewTask }) => {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [draftTask, setDraftTask] = useState(task);

  useEffect(() => {
    setDraftTask(task);
  }, [task]);

  const toggleEditMode = () => {
    setEditing(!isEditing);
  };

  const newItem = () => (
    <ListItem
      key="new-task"
      dense
      autoFocus
    >
      <ListItemIcon>
        <IconButton onClick={() => onTaskUpdate(draftTask)} aria-label="add">
          <AddCircleOutlineIcon />
        </IconButton>
      </ListItemIcon>
      <Form form={draftTask} onUpdate={setDraftTask} />
    </ListItem>
  );

  const item = () => (
    <ListItem
      key={draftTask.id}
      dense
      divider
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={draftTask.status === 'completed'}
          tabIndex={-1}
          disableRipple
          onChange={(event) => {
            setDraftTask({ ...draftTask, status: event.target.checked ? 'completed' : 'incomplete' });
            onTaskUpdate(draftTask);
          }}
          inputProps={{ 'aria-labelledby': draftTask.id }}
        />
      </ListItemIcon>
      { isEditing ? (
        <Form form={draftTask} onUpdate={setDraftTask} />
      ) : (
        <ListItemText className={draftTask.status === 'completed' ? classes.completed : ''} primary={draftTask.title} secondary={draftTask.description} />
      )}
      <ListItemSecondaryAction>
        { isEditing ? (
          <IconButton
            onClick={() => {
              onTaskUpdate(draftTask);
              toggleEditMode();
            }}
            edge="end"
            aria-label="save"
          >
            <SaveAltIcon />
          </IconButton>
        ) : (
          <IconButton onClick={() => toggleEditMode()} edge="end" aria-label="edit">
            <EditRoundedIcon />
          </IconButton>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
  return isNewTask ? newItem() : item();
};

TodoItem.defaultProps = {
  isNewTask: false,
  task:
    {
      id: '',
      title: '',
      status: 'incomplete',
      description: '',
    }
  ,
};

TodoItem.propTypes = {
  onTaskUpdate: propTypes.func.isRequired,
  isNewTask: propTypes.bool,
  task:
    propTypes.shape({
      id: propTypes.string,
      title: propTypes.string,
      status: propTypes.string,
      description: propTypes.string,
      dateCreated: propTypes.string,
    }),

};

export default TodoItem;
