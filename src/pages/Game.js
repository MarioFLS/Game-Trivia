import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../service/fetchQuestions';
import fetchToken from '../service/fetchToken';
import Header from '../components/Header';
import '../css/Game.css';
import { addScore } from '../redux/actions';

/* referência para uso do sort(): https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */

const oneSecond = 1000;
let indexWrongQuestions = 0;
const errorApi = 3;

class Game extends Component {
  state = {
    questions: {},
    isButtonVisible: false,
    indexQuestion: 0,
    answers: [],
    timming: 30,
    isDisabled: false,
  };

  async componentDidMount() {
    await this.getQuestions();
    this.mapQuestions();
    setInterval(this.timeToAwsers, oneSecond);
    this.answersRandom();
  }

  async getQuestions() {
    const { token } = this.props;
    let questions = await fetchQuestions(token);
    const { response_code: responseCode } = questions;

    if (responseCode === errorApi) {
      const newToken = await fetchToken();
      questions = await fetchQuestions(newToken);
    }
    this.setState({ questions });
  }

  checkAnswer = (correctAnswer) => {
    const answerButtons = document.querySelectorAll('.answer-buttons');
    answerButtons.forEach((button) => {
      if (button.innerText === correctAnswer) {
        button.className = 'correct_answer';
      } else {
        button.className = 'wrong_answers';
      }
    });
    this.setState({ isDisabled: true, isButtonVisible: true });
  };

  buttonNextQuestion = () => {
    const { indexQuestion } = this.state;
    this.setState({
      indexQuestion: indexQuestion + 1,
      isButtonVisible: false,
      isDisabled: false,
      timming: 30,
    });
    const { history, name, score, picture } = this.props;
    const QUATRO = 4;

    if (indexQuestion === QUATRO) {
      this.saveToLocalStorage(name, score, picture);
      history.push('/feedback');
    }
  };

  /* referência para uso do sort(): https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
  answersRandom = () => {
    const { questions } = this.state;
    const { results } = questions;
    const answers = results.map(
      ({
        correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers,
      }) => [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 1 / 2),
    );
    this.setState({ answers });
  };

  timeToAwsers = () => {
    const { timming, isDisabled } = this.state;
    if (timming > 0 && !isDisabled) { return this.setState({ timming: timming - 1 }); }
    return this.isDisabled();
  };

  mapQuestions = () => {
    const { questions, answers, isDisabled, indexQuestion } = this.state;
    const { results } = questions;
    if (results && answers.length > 0) {
      return results.map(
        ({ category, correct_answer: correctAnswer, question }, index) => {
          const addIndex = () => {
            indexWrongQuestions += 1;
            return indexWrongQuestions - 1;
          };
          return (
            <section key={ index }>
              <h4 data-testid="question-text">{question}</h4>
              <p data-testid="question-category">{category}</p>
              <div data-testid="answer-options">
                {answers[indexQuestion].map(
                  (questionsClick, indexQuestions) => (
                    <button
                      onClick={ (e) => {
                        this.checkAnswer(correctAnswer);
                        this.setPointsOnGlobal(e);
                      } }
                      className="answer-buttons"
                      key={ indexQuestions }
                      disabled={ isDisabled }
                      data-testid={
                        questionsClick.includes(correctAnswer)
                          ? 'correct-answer'
                          : `wrong-answer-${addIndex()}`
                      }
                      type="button"
                    >
                      {questionsClick}
                    </button>
                  ),
                )}
              </div>
            </section>
          );
        },
      )[indexQuestion];
    }
  };

  isDisabled = () => {
    const { timming } = this.state;
    if (timming === 0) {
      this.setState({ isDisabled: true, isButtonVisible: true });
    }
  };

  // referencia para salvar múltiplos valores na mesma chave do localStorage:
  // https://medium.com/@lameckanao/armazenando-e-manipulando-dados-no-localstorage-7bcc901ba12b
  saveToLocalStorage = (name, score, picture) => {
    const ranking = { name, score, picture };
    if (localStorage.getItem('ranking') === null) {
      // Adicionando um array com um objeto no localstorage
      localStorage.setItem('ranking', JSON.stringify([ranking]));
    } else {
      // Copiando o array existente no localstorage e adicionando o novo objeto ao final.
      localStorage.setItem(
        'ranking',
        // O JSON.parse transforma a string em JSON novamente, o inverso do JSON.strigify
        JSON.stringify([
          ...JSON.parse(localStorage.getItem('ranking')),
          ranking,
        ]/* .sort((usera, userb) => userb.score - usera.score) */),
      );
    }
  }

  setPointsOnGlobal = (e) => {
    if (e.target.className === 'correct_answer') {
      const { dispatch } = this.props;
      dispatch(addScore(this.sumPoints(this.getDifficult())));
    }
  };

  getDifficult = () => {
    const currentQuestion = document.getElementsByTagName('h4');
    const questionActual = currentQuestion[0].innerText;
    const { questions } = this.state;
    const { results } = questions;
    const find = results.find(
      (question) => question.question === questionActual,
    );
    const difficult = find.difficulty;
    return difficult;
  };

  sumPoints = (difficulty) => {
    const TRES = 3;
    let difficultyValue = 0;
    if (difficulty === 'easy') {
      difficultyValue = 1;
    } else if (difficulty === 'medium') {
      difficultyValue = 2;
    } else if (difficulty === 'hard') {
      difficultyValue = TRES;
    }
    const DEZ = 10;
    const { timming } = this.state;
    const calc = DEZ + timming * difficultyValue;
    return calc;
  };

  render() {
    const { timming, isButtonVisible } = this.state;
    return (
      <div>
        <Header />
        {this.mapQuestions()}
        {isButtonVisible && (
          <button
            type="button"
            onClick={ this.buttonNextQuestion }
            data-testid="btn-next"
          >
            Next
          </button>
        )}
        <h3>{`Você tem: ${timming}s`}</h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  token: state.token,
  name: state.player.name,
  score: state.player.score,
  picture: state.player.userURL,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
