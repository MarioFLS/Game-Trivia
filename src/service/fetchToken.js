const url = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  try {
    const response = await fetch(url);
    const token = await response.json();
    console.log(token);
    return token;
  } catch (err) {
    return err;
  }
};

export default fetchToken;
