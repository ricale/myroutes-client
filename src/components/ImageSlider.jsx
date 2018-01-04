import React, {Component} from 'react';

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

    console.log()

    this.setState({imageWidth, imageHeight, orientation});
  }

  getCurrentImageSrc() {
    const {images, current} = this.props;
    return `${API_HOST}${images.filter(i => i.id == current)[0].image}`;
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
    const {show} = this.props;
    const {orientation} = this.state;

    if(!show) {
      return <span></span>
    }

    return (
      <div className={`image-slider ${orientation || ''}`}>
        <img
          ref={i => this.el = i}
          src={this.getCurrentImageSrc()}
          style={this.getImageStyle()}
          onLoad={this.handleLoadImage}
          className='image-slider__image'
          />
      </div>
    );
  }
}
