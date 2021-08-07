import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import SyncIcon from '@material-ui/icons/Sync';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import propTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '1rem',
  },
  wrapper: {
    display: 'flex',
    alignContent: 'center',
  },
}));

const Sync = ({ status }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      {(() => {
        switch (status) {
          case 'syncing': return (
            <div className={classes.wrapper}>
              <SyncIcon color="info" />
              <span>Syncing</span>
            </div>
          );
          case 'synced': return (
            <div className={classes.wrapper}>
              <CheckCircleOutlineIcon color="secondary" />
              <span>Synced</span>
            </div>
          );
          case 'unsynced': return (
            <div className={classes.wrapper}>
              <PriorityHighIcon color="info" />
              Unsynced
            </div>
          );
          case 'error': return (
            <div className={classes.wrapper}>
              <SyncProblemIcon color="error" />
              Error during syncing
            </div>
          );
          default: return null;
        }
      })()}
    </div>

  );
};
Sync.propTypes = {
  status: propTypes.string.isRequired,
};

export default Sync;
