import React, {Component} from 'react';

export default class LoadingIndicator extends Component {
  static defaultProps = {
    show: false,
    backgroundColor: 'white'
  };

  render() {
    const {
      show,
      backgroundColor
    } = this.props;

    const display = show ? 'block' : 'none';
    return (
      <div style={{
          display,
          backgroundColor,
          opacity: 0.75,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}>
      </div>
    );
  }
}
