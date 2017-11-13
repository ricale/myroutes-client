import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Icon from 'components/Icon';

export default class IconButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(event);
  }

  render() {
    const {iconName, to, className} = this.props;

    if(to) {
      return (
        <Link to={to} className={`button ${className || ''}`}>
          <Icon name={iconName} />
        </Link>
      )


    } else {
      return (
        <a href='#' onClick={this.handleClick} className={`button ${className || ''}`}>
          <Icon name={iconName} />
        </a>
      );
    }
  }
}
