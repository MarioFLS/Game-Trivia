import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Ranking extends Component {
  getLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('ranking'));
    const usersSort = users.sort((usera, userb) => usera.score - userb.score);
    return usersSort.map(({ name, score, url }, index) => (
      <section key={ index }>
        <p>{ name }</p>
        <p>{ score }</p>
        <img src={ url } alt="profile avatar" />
      </section>
    ));
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h2 data-testid="ranking-title">Ranking</h2>
        <main>
          {this.getLocalStorage()}
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Play Again
          </button>
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
