import React, {Component} from 'react';
import EXIF from 'exif-js';
import exif2css from 'exif2css';

import './PlaceImage.less'

export default class PlaceImage extends Component {
  static defaultProps = {
    width: 300
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.handleLoadImage = this.handleLoadImage.bind(this);
  }

  componentWillMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleLoadImage(event) {
    const reactElement = this;

    const imageWidth = this.el.offsetWidth;
    const imageHeight = this.el.offsetHeight;

    EXIF.getData(event.target, function() {
      const orientation = EXIF.getTag(this, "Orientation");
      reactElement._ismounted && reactElement.setState({
        orientation,
        imageWidth,
        imageHeight
      });
    });
  }

  isRotated90Degrees() {
    const {orientation} = this.state;
    return orientation >= 5;
  }

  getTransform() {
    const {orientation} = this.state;

    const orientationCss = exif2css(orientation);

    return {
      transform: orientationCss.transform,
      transformOrigin: orientationCss['transform-origin']
    };
  }

  getContainerSize() {
    const {
      width
    } = this.props;

    const {
      imageWidth,
      imageHeight,
      orientation
    } = this.state;

    return {
      width:  (this.isRotated90Degrees() ? imageHeight : imageWidth)  || width,
      height: (this.isRotated90Degrees() ? imageWidth  : imageHeight) || width,
    }
  }

  render() {
    const {
      src,
      onClickDelete,
      width
    } = this.props;

    const {orientation} = this.state;

    const containerStyle = this.getContainerSize();

    const imgStyle = Object.assign({
      maxWidth: width,
      maxHeight: width,
    }, this.getTransform());

    const wallStyle = {width, height: width};

    return (
      <div className='place-image' style={containerStyle} >
        <img
          src={src}
          ref={i => this.el = i}
          className='place-image__img'
          onLoad={this.handleLoadImage}
          style={imgStyle}
          />

        {onClickDelete &&
          <a href='#' onClick={onClickDelete} className='place-image__delete-button'>삭제</a>
        }

        {!orientation &&
          <div className='place-image__wall' style={wallStyle}></div>
        }
      </div>
    );
  }
}