import React, {Component} from 'react';

export default class PlaceImage extends Component {
  static defaultProps = {
    containerStyle: {
      display: 'inline-block',
      margin: 1
    },
    style: {
      maxWidth: 300,
      maxHeight: 300
    }
  };

  render() {
    const {
      src,
      containerStyle,
      style,
      onClickDelete
    } = this.props;

    return (
      <div style={containerStyle}>
        <img src={src} style={style} />
        {onClickDelete &&
          <a href='#' onClick={onClickDelete}>삭제</a>
        }
      </div>
    );
  }
}