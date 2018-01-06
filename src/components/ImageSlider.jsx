import React, {Component} from 'react';

import IconButton from 'components/IconButton';
import {API_HOST} from 'utils/constants';

import './ImageSlider.less';

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleLoadImage = this.handleLoadImage.bind(this);
  }

  handleLoadImage(event) {
    const imageWidth = this.el.offsetWidth;
    const imageHeight = this.el.offsetHeight;
    const orientation = imageWidth > imageHeight ? 'landscape' : 'portrait';

    this.setState({imageWidth, imageHeight, orientation});
  }

  getImageStyle() {
    const {imageWidth, imageHeight, orientation} = this.state;
    return {
      width:  imageWidth,
      height: imageHeight,
      maxWidth:  "90%",
      maxHeight: "90%",
      opacity:    orientation ? 1 : 0,
      marginTop:  this.isLandscape() ? 0 : '5%',
      marginLeft: this.isPortrait()  ? 0 : '5%',
    };
  }

  isLandscape() {
    return this.state.orientation === 'landscape';
  }

  isPortrait() {
    return this.state.orientation === 'portrait';
  }

  render() {
    const {
      src,
      style,
    } = this.props;

    const {
      orientation
    } = this.state;

    return (
      <div className={`image-slider__image-wrapper ${orientation || ''}`} style={style}>
        <img
          ref={i => this.el = i}
          src={src}
          style={this.getImageStyle()}
          onLoad={this.handleLoadImage}
          className='image-slider__image'
          />
      </div>
    );
  }
}

export default class ImageSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickNext = this.handleClickNext.bind(this);
  }

  handleClickPrev() {
    this.props.onClickPrev(this.getPrevImage().id);
  }

  handleClickNext() {
    this.props.onClickNext(this.getNextImage().id);
  }

  getCurrentImage() {
    const {images, current} = this.props;
    return images.map((img, i) =>
      ({index: i, ...img})
    ).filter(img =>
      img.id == current
    )[0];
  }

  getPrevImage() {
    const {images} = this.props;
    const {index} = this.getCurrentImage();
    const prevIndex = index > 0 ? index - 1 : images.length - 1;
    return images[prevIndex];
  }

  getNextImage() {
    const {images} = this.props;
    const {index} = this.getCurrentImage();
    const nextIndex = index < images.length - 1 ? index + 1 : 0;
    return images[nextIndex];
  }

  getCurrentImages() {
    const {images} = this.props;
    const imageLength = images.length;

    const current = this.getCurrentImage();
    const prev    = this.getPrevImage();
    const next    = this.getNextImage();

    if(imageLength <= 2) {
      return [current, next];
    }

    return [current, prev, next];
  }

  render() {
    const {show, onClickClose, onClickPrev, onClickNext} = this.props;
    const {orientation} = this.state;

    if(!show) {
      return <span></span>
    }

    return (
      <div className={`image-slider ${orientation || ''}`}>
        {this.getCurrentImages().map(img =>
          <Slide
            key={img.id}
            src={`${API_HOST}${img.image}`} />
        )}

        <IconButton
          className='image-slider__button close'
          iconName='remove'
          onClick={onClickClose}
          />
        <IconButton
          className='image-slider__button prev'
          iconName='caret-left'
          iconSize='4x'
          onClick={this.handleClickPrev}
          />
        <IconButton
          className='image-slider__button next'
          iconName='caret-right'
          iconSize='4x'
          onClick={this.handleClickNext}
          />
      </div>
    );
  }
}
