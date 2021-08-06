const initialState = {
  data: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        data: state.data + 1,
      };
    default:
      return state;
  }
};
