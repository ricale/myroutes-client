import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import './Button.less';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(event);
  }

  getClassName() {
    const {className} = this.props;
    return `button ${className || ''}`;
  }

  render() {
    const {to, children} = this.props;

    if(to) {
      return (
        <Link to={to} className={this.getClassName()}>
          {children}
        </Link>
      )


    } else {
      return (
        <a href='#' onClick={this.handleClick} className={this.getClassName()}>
          {children}
        </a>
      );
    }
  }
}
