import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { saveURL } from '../redux/actions';

class Header extends Component {
  state = {
    userImage: '',
  }

  componentDidMount() {
    const { saveURLPicture } = this.props;
    const convertEmailToHash = this.convertEmailToHash();
    const userImage = (`https://www.gravatar.com/avatar/${convertEmailToHash}`);
    this.setState({ userImage });
    saveURLPicture(userImage);
  }

  convertEmailToHash = () => {
    const { userEmail } = this.props;
    const hashEmail = md5(userEmail).toString();
    return hashEmail;
  }

  render() {
    const { userImage } = this.state;
    const { userName, score } = this.props;
    return (
      <header>
        {userImage && <img
          src={ userImage }
          alt="logo"
          data-testid="header-profile-picture"
        />}
        <h3 data-testid="header-player-name">
          Nome
          {userName}
        </h3>
        <h3 data-testid="header-score">
          {/* Score: */}
          {score}
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  saveURLPicture: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.player.gravatarEmail,
  userName: state.player.name,
  score: state.player.score,
});

const mapDispatchToProps = (dispatch) => ({
  saveURLPicture: (url) => dispatch(saveURL(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
