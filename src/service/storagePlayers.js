/* import fetchToken from './fetchToken'; */

const saveToken = async (returnApi) => {
  /* const returnApi = await fetchToken(); */
  localStorage.setItem('token', returnApi);
};

export default saveToken;