import React, {Component} from 'react';

import Fade from 'components/Fade';

import './Message.less';

export default class Message extends Component {
  static defaultProps = {
    duration: 3000,
    animationDuration: 3000,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    const {message} = this.props;
    const {
      message: newMessage,
      duration: newDuration
    } = newProps;

    if(message !== newMessage) {
      this.setState({show: true}, () => {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(
          () => this.setState({show: false}),
          newDuration
        )
      });
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  getClassName() {
    const {className, type} = this.props;
    return `message message_${type} ${className}`;
  }

  render() {
    const {message, type, animationDuration} = this.props;
    const {show} = this.state;

    return (
      <div className={this.getClassName()}>
        <Fade show={show} string={message} duration={animationDuration} />
      </div>
    );
  }
}
