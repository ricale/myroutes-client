import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {login} from 'actions/users';
import pathHelper from 'utils/pathHelper';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({username: event.target.value});
  }

  handleChangePassword(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    const {login, goToRouteList} = this.props;
    const {username, password} = this.state;
    this.props.login({username, password}).then(() =>
      goToRouteList()
    );
  }

  render() {
    const {username, password} = this.state;
    return (
      <div>
        <div>
          <label>아이디</label>
          <input
            name='username'
            type='text'
            value={username}
            onChange={this.handleChangeUsername}
            />
        </div>
        <div>
          <label>비밀번호</label>
          <input
            name='password'
            type='password'
            value={password}
            onChange={this.handleChangePassword}
            />
        </div>
        <button onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    login: (...args) =>
      dispatch(login(...args)),
    goToRouteList: (...args) =>
      dispatch(push(pathHelper.routes.list()))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
