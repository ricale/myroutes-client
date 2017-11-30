import React, {Component} from 'react';

import Fade from 'components/Fade';

import './Message.less';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    const {message} = this.props;
    const {message: newMessage} = newProps;

    if(message !== newMessage) {
      this.setState({show: true}, () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.setState({show: false}), 1000)
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const {message, className} = this.props;
    const {show} = this.state;

    return (
      <div className={`message ${className}`}>
        <Fade show={show} string={message} />
      </div>
    );
  }
}
