import React, {Component} from 'react';
import LazyLoad from 'react-lazyload';
import EXIF from 'exif-js';
import exif2css from 'exif2css';

import IconButton from 'components/IconButton';

import './PlaceImage.less'

export default class PlaceImage extends Component {
  static defaultProps = {
    width: 300,
    wall: true,
    loaded: false,
    correctImageOrientation: false,
    showOriginal: false
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.handleLoadImage = this.handleLoadImage.bind(this);
    this.handleClickImage = this.handleClickImage.bind(this);
  }

  componentWillMount() {
    this._ismounted = true;
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  handleLoadImage(event) {
    const {correctImageOrientation} = this.props;

    const imageWidth = this.el.offsetWidth;
    const imageHeight = this.el.offsetHeight;

    if(!correctImageOrientation) {
      this.setState({loaded: true, imageWidth, imageHeight});
    }

    const reactElement = this;

    EXIF.getData(event.target, function() {
      const orientation = EXIF.getTag(this, "Orientation") || 0;
      reactElement._ismounted && reactElement.setState({
        loaded: true,
        orientation,
        imageWidth,
        imageHeight
      });
    });
  }

  handleClickImage() {
    const {onClick} = this.props;
    onClick && onClick();
  }

  isRotated90Degrees() {
    const {orientation} = this.state;
    return orientation >= 5;
  }

  isNeedWall() {
    const {wall} = this.props;
    const {loaded} = this.state;

    return wall && !loaded;
  }

  getTransform() {
    const {orientation} = this.state;

    const orientationCss = exif2css(orientation);

    return {
      transform: orientationCss.transform,
      transformOrigin: orientationCss['transform-origin']
    };
  }

  getImageStyle() {
    const {width, correctImageOrientation, onClick} = this.props;

    const style = {
      maxWidth: width,
      maxHeight: width,
    };

    if(onClick) {
      style.cursor = 'pointer';
    }

    if(!correctImageOrientation) {
      return style;
    }

    return Object.assign(style, this.getTransform());
  }

  getContainerSize() {
    const {correctImageOrientation, width} = this.props;

    const {
      imageWidth,
      imageHeight,
      orientation
    } = this.state;

    // return {
    //   width:  (this.isRotated90Degrees() ? imageHeight : imageWidth)  || width,
    //   height: (this.isRotated90Degrees() ? imageWidth  : imageHeight) || width,
    // }

    if(!imageWidth) {
      return {width, height: width};
    }

    const isLandscape = imageWidth > imageHeight;

    const length = isLandscape ? imageWidth : imageHeight;
    const paddingTop  = isLandscape ? (imageWidth - imageHeight) / 2 : 0;
    const paddingLeft = isLandscape ? 0 : (imageHeight - imageWidth) / 2;

    return {
      width:  length,
      height: length,
      paddingTop,
      paddingLeft
    }
  }

  render() {
    const {
      src,
      onClickDelete,
      width,
      correctImageOrientation,
      originalSrc
    } = this.props;

    const containerStyle = this.getContainerSize();

    const imgStyle = this.getImageStyle();

    const wallStyle = {width, height: width};

    return (
      <div className='place-image' style={containerStyle} >
        <LazyLoad offset={400}>
          <img
            src={src}
            ref={i => this.el = i}
            className='place-image__img'
            onLoad={this.handleLoadImage}
            onClick={this.handleClickImage}
            style={imgStyle}
            />
        </LazyLoad>

        {onClickDelete &&
          <IconButton onClick={onClickDelete} className='place-image__delete-button' iconName='remove' />
        }

        {/*this.isNeedWall() &&
          <div className='place-image__wall' style={wallStyle}></div>
        */}
      </div>
    );
  }
}
