const initialStateUser = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const initialStateToken = {};

export function player(state = initialStateUser, action) {
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
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
