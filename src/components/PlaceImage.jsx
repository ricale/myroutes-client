import React, {Component} from 'react';

import './PlaceImage.less'

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
      <div className='place-image'>
        <img src={src} className='place-image__img' />
        {onClickDelete &&
          <a href='#' onClick={onClickDelete} className='place-image__delete-button'>삭제</a>
        }
      </div>
    );
  }
}