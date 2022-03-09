const url = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data.token;
  } catch (err) {
    return err;
  }
};

export default fetchToken;