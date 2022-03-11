const INITIAL_STATE = {
  questions: [],

};

export default function questions(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'GET_QUESTIONS':
    return {
      ...state,
    };
  default:
    return state;
  }
}
