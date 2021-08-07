import React, { useState, useEffect, useMemo } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import propTypes from 'prop-types';
import isEqual from 'lodash.isequal';
import Form from './Form';
import TimeLeftCountDown from './TimeLeftCountDown';

const useStyles = makeStyles(() => ({
  expired: {
    backgroundColor: '#D3D3D3',
  },
  completed: {
    textDecoration: 'line-through',
  },
  secondaryActions: {
    marginLeft: 'auto',
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

  const isExpired = useMemo(() => draftTask.status === 'expired', [draftTask]);

  return (
    <ListItem
      className={isExpired ? classes.expired : ''}
      key={draftTask.id}
      dense
      divider
      data-test-item-todo
    >
      <ListItemIcon>
        <Checkbox
          data-test-item-checkbox
          edge="start"
          checked={draftTask.status === 'completed'}
          tabIndex={-1}
          disableRipple
          disabled={isExpired}
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
          data-text-item-form
          form={draftTask}
          onError={setError}
          isDirty={isDirty}
          onUpdate={setDraftTask}
        />
      ) : (
        <div>
          <ListItemText
            data-text-item-text
            className={
              draftTask.status === 'completed' ? classes.completed : ''
            }
            primary={draftTask.title}
            secondary={draftTask.description}
          />
          {!!draftTask.deadLine && draftTask.status !== 'completed' && (
            <TimeLeftCountDown
              onCountdownOver={() => {
                onTaskUpdate({
                  ...draftTask,
                  status: 'expired',
                });
              }}
              deadLine={draftTask.deadLine}
            />
          )}
        </div>
      )}
      <div className={classes.secondaryActions}>
        <IconButton
          data-text-item-remove
          onClick={() => {
            onTaskRemove(draftTask);
          }}
        >
          <DeleteIcon />
        </IconButton>
        <div>
          {!isExpired && (
            <div>
              {isEditing ? (
                <IconButton
                  data-text-item-save
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
                  data-text-item-edit
                  onClick={() => toggleEditMode()}
                  edge="end"
                  aria-label="edit"
                >
                  <EditRoundedIcon />
                </IconButton>
              )}
            </div>
          )}
        </div>
      </div>
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
