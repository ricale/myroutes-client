import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import IconButton from 'components/IconButton';
import GoogleSession from 'components/GoogleSession';
import pathHelper from 'utils/pathHelper';

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
    this.props.logout();
  }

  render() {
    const {loading} = this.props;

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

        <LoadingIndicator show={loading} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.common.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (...args) =>
      dispatch(login(...args)),
    logout: (...args) =>
      dispatch(logout(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
