import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import '../css/Feedback.css';

export class Feedback extends Component {
  correctQuestions = () => {
    const { assertions } = this.props;
    if (assertions > 0) {
      if (assertions === 1) {
        return (<p>{`Você acertou: ${assertions} questão!`}</p>);
      }
      return (<p>{`Você acertou: ${assertions} questões!!`}</p>);
    }
    return <p>Você não acertou nenhuma questão...</p>;
  }

  render() {
    const { assertions, score, history } = this.props;
    const NUMBER_ASSERTIONS = 3;
    return (
      <div>
        <Header />
        <main className="feedback-container">
          <section className="inform-section">
            {this.correctQuestions()}
            <p>
              {assertions < NUMBER_ASSERTIONS ? 'Could be better...' : 'Well Done!'}
            </p>
            <p>{`Sua pontuação é: ${score}`}</p>
          </section>
          <div className="btn-container">
            <button
              type="button"
              className="btn-play-feedback"
              onClick={ () => history.push('/') }
            >
              Play Again
            </button>
            <button
              className="btn-ranking"
              type="button"
              onClick={ () => history.push('/ranking') }
            >
              Ranking
            </button>
          </div>
        </main>
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  score: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
