const initialState = {
  tasks: {},
  tasksCount: 0,
  error: null,
  status: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_STATUS':
      return {
        ...state,
        status: action.status,
      };
    case 'SET_TASKS':
      return {
        ...state,
        tasksCount: action.tasks.count,
        tasks: action.tasks.rows.reduce((acc, task) => {
          if (state.tasks[task.id]) {
            acc[task.id] = { ...state.tasks[task.id], ...task };
            return acc;
          }
          acc[task.id] = task;
          return acc;
        }, {}),
      };
    case 'REMOVE_TASK': {
      return {
        ...state,
        tasks: Object.keys(state.tasks).filter((id) => id !== action.task.id).reduce((obj, key) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = state.tasks[key];
          return obj;
        }, {}),
      };
    }
    case 'UPDATE_TASK': {
      return {
        ...state,
        tasks: { ...state.tasks, [action.task.id]: action.task },
      };
    }
    case 'TASK_REQ_FAILED': {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
