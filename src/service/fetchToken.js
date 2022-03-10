const url = 'https://opentdb.com/api_token.php?command=request';

export const fetchToken = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.token;
  } catch (err) {
    return err;
  }
};

export const getImage = async (hashImage) => {
  try {
    const response = await fetch(`https://www.gravatar.com/avatar/${hashImage}`);
    return response;
  } catch (err) {
    return err;
  }
};
