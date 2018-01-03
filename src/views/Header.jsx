import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';
import {Link} from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import IconButton       from 'components/IconButton';
import SessionButton    from 'components/SessionButton';
import Message          from 'components/Message';
import pathHelper       from 'utils/pathHelper';
import sessionHelper    from 'utils/sessionHelper';

import {logout} from 'actions/users';

import './Header.less';

class Header extends Component {
  constructor(props) {
    super(props);
    // this.handleSuccessGoogleLogin = this.handleSuccessGoogleLogin.bind(this);
    // this.handleSuccessGoogleLogout = this.handleSuccessGoogleLogout.bind(this);
  }

  // handleSuccessGoogleLogin(res) {
  //   this.props.login({
  //     token:     res.tokenId,
  //     google_id: res.googleId,
  //     name:      res.profileObj.name,
  //     email:     res.profileObj.email,
  //   });
  // }

  // handleSuccessGoogleLogout() {
  //   const {logout, goToIndex} = this.props;
  //   logout().then(() =>
  //     goToIndex()
  //   );
  // }

  render() {
    const {loading, message, messageType, messageTimestamp, hasSession, logout} = this.props;

    return (
      <div className='header'>
        <h1><Link to={pathHelper.routes.list()}>myroutes</Link></h1>
        <ul className='header__menu'>
          <li>
            {hasSession &&
              <IconButton to={pathHelper.routes.new()} iconName='plus' />
            }
            <SessionButton hasSession={hasSession} logout={logout}/>
          </li>
        </ul>

        <Message
          className='header__message'
          message={message}
          timestamp={messageTimestamp}
          type={messageType}
          />

        <LoadingIndicator show={loading} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const {loading, message, messageType, messageTimestamp} = state.common;
  const hasSession = sessionHelper.hasToken();
  return {loading, message, messageType, messageTimestamp, hasSession};
}

function mapDispatchToProps(dispatch) {
  return {
    logout: (...args) =>
      dispatch(logout(...args)),
    goToIndex: (...args) =>
      dispatch(push(pathHelper.index()))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
