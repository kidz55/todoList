import React, { useState } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  completed: {
    textDecoration: 'line-through',
  },
}));

const TodoItem = ({ task, updateTask }) => {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const toggleEditMode = () => {
    setEditing(!isEditing);
  };
  return (
    <ListItem
      key={task.id}
      dense
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={task.status === 'completed'}
          tabIndex={-1}
          disableRipple
          inputProps={{ 'aria-labelledby': task.id }}
        />
      </ListItemIcon>
      { !isEditing && (
      <ListItemText className={task.status === 'completed' ? classes.completed : ''} primary={task.title} secondary={task.description} />
      )}
      { isEditing && (
      <form noValidate autoComplete="off">
        <TextField
          id={`title-${task.id}`}
          defaultValue={task.title}
          label="title"
        />
        <TextField
          id={`desc-${task.id}`}
          label="description"
          multiline
          maxRows={4}
          defaultValue={task.description}
        />
      </form>
      )}
      <ListItemSecondaryAction>
        <IconButton onClick={() => toggleEditMode()} edge="end" aria-label="edit">
          { isEditing ? (<SaveAltIcon />) : (<EditRoundedIcon />)}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

TodoItem.defaultProps = {
  task:
    {
      id: '1234',
      title: 'my task 1',
      status: 'incompleted',
      description: 'description 1',
      dateCreated: 'August 19, 1975 23:17:30',
    }
  ,
};

TodoItem.propTypes = {
  updateTask: propTypes.func.isRequired,
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
