import React, {Component} from 'react';

import IconButton from 'components/IconButton';
import pathHelper from 'utils/pathHelper';

export default class SessionButton extends Component {
  render() {
    const {hasSession, logout} = this.props;
    return (
      <span>
        {!hasSession && <IconButton to={pathHelper.login()} iconName='sign-in' />}
        {hasSession && <IconButton onClick={logout} iconName='sign-out' />}
      </span>
    );
  }
}
