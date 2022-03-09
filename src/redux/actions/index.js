import fetchToken from '../../service/fetchToken';

const fetchApiToken = (token) => ({
  type: 'ADD_TOKEN',
  token,
});

const fetchApiTokenThunk = () => async (dispatch) => {
  const response = await fetchToken();
  dispatch(fetchApiToken(response));
};

export default fetchApiTokenThunk;
