import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../service/fetchQuestions';
import fetchToken from '../service/fetchToken';
import Header from '../components/Header';
import '../css/Game.css';

const oneSecond = 1000;
class Game extends Component {
  state = {
    questions: {},
    answers: [],
    timming: 30,
    isDisabed: false,
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
    const errorApi = 3;
    const { response_code: responseCode } = questions;
    if (responseCode === errorApi) {
      const newToken = await fetchToken();
      questions = await fetchQuestions(newToken);
    }
    this.setState({ questions });
  }

  checkAnswer = (correctAnswer) => {
    console.log(correctAnswer);
    const answerButtons = document.querySelectorAll('.answer-buttons');
    answerButtons.forEach((button) => {
      if (button.innerText === correctAnswer) {
        button.className = 'correct_answer';
      } else {
        button.className = 'wrong_answers';
      }
    });
  }

  answersRandom = () => {
    const { questions } = this.state;
    const { results } = questions;
    const answers = results
      .map(({ correct_answer: correctAnswer,
        incorrect_answers: incorrectAnswers }) => [...incorrectAnswers, correctAnswer]
        .sort(() => Math.random() - 1 / 2));
    this.setState({ answers });
  }

  timeToAwsers = () => {
    const { timming } = this.state;
    if (timming > 0) return this.setState({ timming: timming - 1 });
    return this.isDisabed();
  }

  /* referência para uso do sort(): https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
  mapQuestions = () => {
    const { questions, answers, isDisabed } = this.state;
    const { results } = questions;
    if (results && answers.length > 0) {
      return results
        .map((
          { category, correct_answer: correctAnswer, question },
          index,
        ) => {
          let indexWrongQuestions = 0;

          const addIndex = () => {
            indexWrongQuestions += 1;
            return indexWrongQuestions - 1;
          };
          return (
            <section key={ index }>
              <h4 data-testid="question-text">{question}</h4>
              <p data-testid="question-category">{category}</p>
              <div data-testid="answer-options">
                {
                  answers[0].map((questionsClick, indexQuestions) => (
                    <button
                      onClick={ () => this.checkAnswer(correctAnswer) }
                      className="answer-buttons"
                      key={ indexQuestions }
                      disabled={ isDisabed }
                      data-testid={ questionsClick.includes(correctAnswer)
                        ? 'correct-answer' : `wrong-answer-${addIndex()}` }
                      type="button"
                    >
                      {questionsClick}
                    </button>
                  ))
                }
              </div>
            </section>
          );
        })[0];
    }
  }

  isDisabed =() => {
    const { timming } = this.state;
    if (timming === 0) {
      this.setState({ isDisabed: true });
    }
  }

  render() {
    const { timming } = this.state;
    return (
      <div>
        <Header />
        {this.mapQuestions()}
        {`Você tem: ${timming}s`}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ token: state.token });

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
