const initialStateUser = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
};

const initialStateToken = '';

export function player(state = initialStateUser, action) {
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
    };
  default:
    return state;
  }
}

export function token(state = initialStateToken, action) {
  switch (action.type) {
  case 'ADD_TOKEN':
    return action.token;
  default:
    return state;
  }
}
