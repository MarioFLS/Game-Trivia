import fetchToken from '../../service/fetchToken';
import storagePlayers from '../../service/storagePlayers';

export const saveUser = (payload) => ({
  type: 'ADD_USER',
  payload,
});

const fetchApiToken = (token) => ({
  type: 'ADD_TOKEN',
  token,
});

export const fetchApiTokenThunk = () => async (dispatch) => {
  const response = await fetchToken();
  storagePlayers(response);
  dispatch(fetchApiToken(response));
};
