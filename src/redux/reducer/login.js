const initialState = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

function player(state = initialState, action) {
  switch (action.type) {
  case 'ADD_LOGIN':
    return {
      ...state,
      email: action.payload,
    };
  default:
    return state;
  }
}

export default player;
