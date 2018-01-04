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
    const {onClick} = this.props;
    onClick && onClick();
  }

  getClassName() {
    const {className} = this.props;
    return `button ${className || ''}`;
  }

  render() {
    const {to, children, className, onClick, ...attrs} = this.props;

    if(to) {
      return (
        <Link to={to} className={this.getClassName()} {...attrs}>
          {children}
        </Link>
      )


    } else {
      return (
        <a href='#' onClick={this.handleClick} className={this.getClassName()} {...attrs}>
          {children}
        </a>
      );
    }
  }
}
