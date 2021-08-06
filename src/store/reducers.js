const initialState = {
  tasks: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.tasks.reduce((acc, task) => {
          if (state.tasks[task.id]) {
            acc[task.id] = { ...state.tasks[task.id], ...task };
            return acc;
          }
          acc[task.id] = task;
          return acc;
        }, {}),
      };
    case 'REMOVE_TASK': {
      const { tasks } = state;
      if (tasks[action.task.id]) {
        delete tasks[action.task.id];
      }
      return {
        ...state,
      };
    }
    case 'UPDATE_TASK': {
      return {
        ...state,
        tasks: { ...state.tasks, [action.task.id]: action.task },
      };
    }
    default:
      return state;
  }
};
