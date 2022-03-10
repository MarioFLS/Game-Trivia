import fetchToken from '../../service/fetchToken';
import fetchQuestions from '../../service/fetchQuestions';
import storagePlayers from '../../service/storagePlayers';

const fetchApiToken = (token) => ({
  type: 'ADD_TOKEN',
  token,
});

const fetchApiTokenThunk = () => async (dispatch) => {
  const response = await fetchToken();
  storagePlayers(response);
  dispatch(fetchApiToken(response));
};

const fetchApiQuestionsThunk = () => async (dispatch) => {
  const response = await fetchQuestions();
  dispatch(fetchApiToken(response));
};

export default fetchApiTokenThunk;
