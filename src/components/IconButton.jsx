import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import Icon from 'components/Icon';
import Button from 'components/Button';

import './IconButton.less';

export default class IconButton extends Component {
  static defaultProps = {
    iconSize: 'lg'
  };

  render() {
    const {iconName, iconSize, className, ...attrs} = this.props;

    return (
      <Button {...attrs} className={`icon-button ${className || ''}`}>
        <Icon name={iconName} size={iconSize} />
      </Button>
    );
  }
}
