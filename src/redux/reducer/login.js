const initialStateUser = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  userURL: '',
};

const initialStateToken = '';

export function player(state = initialStateUser, action) {
  switch (action.type) {
  case 'ADD_USER':
    return {
      ...state,
      name: action.payload.name,
      gravatarEmail: action.payload.email,
      score: 0,
    };
  case 'ADD_SCORE':
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + 1,
    };
  case 'ADD_URL':
    return {
      ...state,
      userURL: action.url,
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
