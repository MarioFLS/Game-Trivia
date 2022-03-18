import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/Ranking.css';
import Header from '../components/Header';

export class Ranking extends Component {
  componentDidMount() {
    this.getLocalStorage();
  }

  getLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('ranking'));
    return (users !== null ? users
      .sort((userA, userB) => userB.score - userA.score)
      .map(({ name, score, picture }, index) => (
        <section className="card-user" key={ index }>
          <img src={ picture } alt="profile avatar" />
          <p>{name}</p>
          <p>{`Seus Pontos: ${score}`}</p>
        </section>
      )) : <h3 className="no-Ranking">INFELIZMENTE AINDA NÃO TEMOS RANKING</h3>);
  }

  render() {
    const { history } = this.props;
    const users = JSON.parse(localStorage.getItem('ranking'));
    console.log(users);
    return (
      <div className="main-ranking-container">
        <Header />
        <h2 className="title">Ranking</h2>
        <main>
          <button
            type="button"
            className="btn-play-ranking"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
          <div className="ranking-container">
            {this.getLocalStorage()}
          </div>
        </main>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
