import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getImage } from '../service/fetchToken';

class Header extends Component {
  state = {
    userImage: '',
  }

  async componentDidMount() {
    const convert = await this.convertEmailToHash();
    this.setState({ userImage: convert.url });
  }

  convertEmailToHash = async () => {
    const { userEmail } = this.props;
    const hashEmail = md5(userEmail).toString();
    const userImage = await getImage(hashEmail);
    return userImage;
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
          Nome:
          {userName}
        </h3>
        <h3 data-testid="header-score">
          Score:
          {score}
        </h3>
      </header>
    );
  }
}

Header.propTypes = {
  score: PropTypes.string.isRequired,
  userEmail: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  userEmail: state.player.gravatarEmail,
  userName: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
