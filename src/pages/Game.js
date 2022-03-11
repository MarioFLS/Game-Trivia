import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../service/fetchQuestions';
import fetchToken from '../service/fetchToken';

class Game extends Component {
  state = { questions: {} };

  async componentDidMount() {
    await this.getQuestions();
    this.mapQuestions();
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

  /* referência para uso do sort(): https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array */
  mapQuestions = () => {
    const { questions } = this.state;
    const { results } = questions;
    if (results) {
      return results
        .map((
          { category, correct_answer: correctAnswer,
            incorrect_answers: incorrectAnswers, question },
          index,
        ) => {
          let indexWrongQuestions = 0;

          const addIndex = () => {
            indexWrongQuestions += 1;
            return indexWrongQuestions - 1;
          };

          const erroQuestions = [...incorrectAnswers, correctAnswer]
            .sort(() => ((Math.random() - (1 / 2))));

          return (
            <section key={ index }>
              <h4 data-testid="question-text">{question}</h4>
              <p data-testid="question-category">{category}</p>
              <div data-testid="answer-options">
                {
                  erroQuestions.map((questionsClick, indexQuestions) => (
                    <button
                      key={ indexQuestions }
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

  render() {
    return (
      <div>
        <h2>Algo</h2>
        {this.mapQuestions()}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({ token: state.token });

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
