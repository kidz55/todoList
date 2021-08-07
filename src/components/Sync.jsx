import React from 'react';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SyncProblemIcon from '@material-ui/icons/SyncProblem';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  text: {
    marginLeft: '0.2rem',
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
              <CircularProgress size={20} />
              <span className={classes.text}>Syncing</span>
            </div>
          );
          case 'synced': return (
            <div className={classes.wrapper}>
              <CheckCircleOutlineIcon color="secondary" />
              <span className={classes.text}>Synced</span>
            </div>
          );
          case 'unsynced': return (
            <div className={classes.wrapper}>
              <PriorityHighIcon color="action" />
              <span className={classes.text}>Unsynced</span>
            </div>
          );
          case 'error': return (
            <div className={classes.wrapper}>
              <SyncProblemIcon color="error" />
              <span className={classes.text}>Error during syncing</span>
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
