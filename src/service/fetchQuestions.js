const fetchQuestions = async (seutokenaqui) => {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${seutokenaqui}`);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};

export default fetchQuestions;
