import PropTypes from 'prop-types';
import React, { Component } from 'react';
import '../css/Login.css';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import fetchToken from '../service/fetchToken';
import fetchApiTokenThunk from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
    isDisabled: true,
  }

  componentDidMount = async () => {
    await fetchToken();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateButton());
  }

  validateButton = () => {
    const { name, email } = this.state;
    if (name.length > 0 && email.length > 0) {
      return this.setState({
        isDisabled: false,
      });
    }
    return this.setState({
      isDisabled: true,
    });
  }

  HandleClickButton = (event) => {
    const { dispatch } = this.props;
    console.log(dispatch);
    event.preventDefault();
    dispatch(fetchApiTokenThunk());
  }

  render() {
    const { name, email, isDisabled } = this.state;
    return (
      <div>
        <div className="App">
          <header>
            <img src={ logo } className="App-logo" alt="logo" />
          </header>
          <p>SUA VEZ</p>
          <form>
            <label htmlFor="name">
              <input
                type="text"
                name="name"
                id="name"
                data-testid="input-player-name"
                placeholder="Digite seu nome"
                onChange={ this.handleChange }
                value={ name }
              />
            </label>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
                data-testid="input-gravatar-email"
                placeholder="Digite seu email"
                onChange={ this.handleChange }
                value={ email }
              />
              <button
                type="submit"
                data-testid="btn-play"
                disabled={ isDisabled }
                onClick={ (event) => this.HandleClickButton(event) }
              >
                Play
              </button>
            </label>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
