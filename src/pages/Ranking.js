import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Ranking extends Component {
  getLocalStorage = () => {
    const users = JSON.parse(localStorage.getItem('ranking'));
    const usersSort = users.sort((userA, userB) => userB.score - userA.score);
    return usersSort.map(({ name, score, picture }, index) => (
      <section key={ index }>
        <img src={ picture } alt="profile avatar" />
        <p>{ name }</p>
        <p>{ score }</p>
      </section>
    ));
  }

  render() {
    const { history } = this.props;
    return (
      <div>
        <h2>Ranking</h2>
        <main>
          {this.getLocalStorage()}
          <button
            type="button"
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
