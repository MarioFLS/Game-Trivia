import fetchToken from '../../service/fetchToken';
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

export default fetchApiTokenThunk;
