import React, {Component} from 'react';

import IconButton from 'components/IconButton';
import pathHelper from 'utils/pathHelper';

export default class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount() {
  }

  handleSigninSuccess(res) {
    this.setState({loggedIn: true});

    const {onSuccessLogin} = this.props;
    onSuccessLogin && onSuccessLogin(res);
  }

  signIn(event) {
    event.preventDefault();
    if(!this.state.disabled) {
    }
  }

  signOut(event) {
    event.preventDefault();
    if(authInstance) {
    }
  }

  render() {
    const {loggedIn} = this.state;
    return (
      <span>
        {!loggedIn && <IconButton to={pathHelper.login()} iconName='sign-in' />}
        {loggedIn && <IconButton onClick={this.signOut} iconName='sign-out' />}
      </span>
    );
  }
}
