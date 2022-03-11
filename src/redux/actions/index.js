import storagePlayers from '../../service/storagePlayers';

const fetchApiToken = (token) => ({
  type: 'ADD_TOKEN',
  token,
});

export const fetchApiTokenThunk = (response) => async (dispatch) => {
  storagePlayers(response);
  dispatch(fetchApiToken(response));
};

export default fetchApiTokenThunk;
