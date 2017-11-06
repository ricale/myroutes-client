import React, {Component} from 'react';

import 'font-awesome/css/font-awesome.css';
import './Icon.less';

export default class Icon extends Component {
  getSizeClassName () {
    const {size} = this.props;

    if(!size) {
      return ''
    }

    switch(size) {
      case 'lg':
      case '2x':
      case '3x':
      case '4x':
      case '5x':
        return ` fa-${size}`

      default:
        return ''
    }
  }

  getStyleClassName () {
    const {disabled} = this.props;

    let className = disabled ? ' disabled' : '';

    return className;
  }

  render () {
    const {name, onClick, style} = this.props;

    return (
      <i className={`fa fa-${name}${this.getSizeClassName()}${this.getStyleClassName()}`} onClick={onClick} style={style}></i>
    )
  }
}
