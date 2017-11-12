import React, {Component} from 'react';

import Icon from 'components/Icon';

export default class LoadingIndicator extends Component {
  static defaultProps = {
    show: false,
    iconName: 'hourglass-half',
    iconStyle: {
      position: 'absolute',
      top: 10,
      right: 10,
      color: 'green'
    },
  };

  render() {
    const {
      show,
      iconName,
      iconStyle,
    } = this.props;

    const display = show ? 'block' : 'none';

    return (
      <div style={{
          display,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}>

        <Icon name={iconName} size='4x' style={iconStyle} />
      </div>
    );
  }
}
