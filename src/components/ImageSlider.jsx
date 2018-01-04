import React, {Component} from 'react';

import IconButton from 'components/IconButton';
import {API_HOST} from 'utils/constants';

import './ImageSlider.less';

export default class ImageSlider extends Component {
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

  getCurrentImage() {
    const {images, current} = this.props;
    return images.map((img, i) =>
      ({index: i, ...img})
    ).filter(img =>
      img.id == current
    )[0];
  }

  getCurrentImageSrc() {
    const {image} = this.getCurrentImage();
    return `${API_HOST}${image}`;
  }

  getPrevId() {
    const {images} = this.props;
    const {index} = this.getCurrentImage();
    const prevIndex = index > 0 ? index - 1 : images.length - 1;
    return images[prevIndex].id;
  }

  getNextId() {
    const {images} = this.props;
    const {index} = this.getCurrentImage();
    const nextIndex = index < images.length - 1 ? index + 1 : 0;
    return images[nextIndex].id;
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
    const {show, onClickClose, onClickPrev, onClickNext} = this.props;
    const {orientation} = this.state;

    if(!show) {
      return <span></span>
    }

    return (
      <div className={`image-slider ${orientation || ''}`}>
        <div className={`image-slider__image-wrapper ${orientation || ''}`}>
          <img
            ref={i => this.el = i}
            src={this.getCurrentImageSrc()}
            style={this.getImageStyle()}
            onLoad={this.handleLoadImage}
            className='image-slider__image'
            />
        </div>
        <IconButton
          className='image-slider__button close'
          iconName='remove'
          onClick={onClickClose}
          />
        {/*
        <IconButton
          className='image-slider__button prev'
          iconName='caret-left'
          iconSize='4x'
          onClick={() => onClickPrev(this.getPrevId())}
          />
        <IconButton
          className='image-slider__button next'
          iconName='caret-right'
          iconSize='4x'
          onClick={() => onClickNext(this.getNextId())}
          />
        */}
      </div>
    );
  }
}
