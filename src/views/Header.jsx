import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Link} from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import IconButton       from 'components/IconButton';
import GoogleSession    from 'components/GoogleSession';
import Message          from 'components/Message';
import pathHelper       from 'utils/pathHelper';

import {login, logout} from 'actions/users';

import './Header.less';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSuccessGoogleLogin = this.handleSuccessGoogleLogin.bind(this);
    this.handleSuccessGoogleLogout = this.handleSuccessGoogleLogout.bind(this);
  }

  handleSuccessGoogleLogin(res) {
    this.props.login({
      token:     res.tokenId,
      google_id: res.googleId,
      name:      res.profileObj.name,
      email:     res.profileObj.email,
    });
  }

  handleSuccessGoogleLogout() {
    const {logout, goToIndex} = this.props;
    logout().then(() =>
      goToIndex()
    );
  }

  render() {
    const {loading, message} = this.props;

    return (
      <div className='header'>
        <h1><Link to={pathHelper.routes.list()}>myroutes</Link></h1>
        <ul className='header__menu'>
          <li>
            <IconButton to={pathHelper.routes.new()} iconName='plus' />
            <GoogleSession
              clientId='891848771699-7vgvpu31bp20tqfmtk66b72ukusqfumt.apps.googleusercontent.com'
              onSuccessLogin={this.handleSuccessGoogleLogin}
              onSuccessLogout={this.handleSuccessGoogleLogout}
              />
          </li>
        </ul>

        <Message
          className='header__message'
          message={message}
          />

        <LoadingIndicator show={loading} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {loading, message} = state.common;
  return {loading, message};
}

function mapDispatchToProps(dispatch) {
  return {
    login: (...args) =>
      dispatch(login(...args)),
    logout: (...args) =>
      dispatch(logout(...args)),
    goToIndex: (...args) =>
      dispatch(push(pathHelper.index()))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
