import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetchQuestions from '../service/fetchQuestions';

class Game extends Component {
  state = {
    apiQeA: '',
  };

  componentDidMount() {
    this.getQuestions();
  }

  async getQuestions() {
    const { token } = this.props;
    if (typeof token === 'string') {
      console.log(typeof token);
      const apiReturn = fetchQuestions(token);
      console.log(await apiReturn);
      return apiReturn;
    }
  }

  questions = async () => {
    const apiQeA = await this.getQuestions();
    this.setState({
      apiQeA,
    });
  };

  render() {
    const { token } = this.props;
    const { apiQeA } = this.state;
    console.log(apiQeA);
    console.log(typeof token);
    return <div />;
  }
}
const mapStateToProps = (state) => ({ token: state.token });

Game.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
