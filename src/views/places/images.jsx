import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPlace, addPlaceImage, deletePlaceImage} from 'actions/places';

import PlaceImage from 'components/PlaceImage';

class PlaceImages extends Component {
  constructor(props) {
    super(props);
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }

  componentDidMount() {
    console.log('PlaceImages componentDidMount');
    const {fetchPlace, placeId} = this.props;
    fetchPlace(placeId);
  }

  handleChangeFile(event) {
    const {addPlaceImage, fetchPlace, placeId} = this.props;

    const files = this.refs.file.files;
    const fileLength = files.length;
    const createImage = (i) => {
      const fd = new FormData();
      fd.append('file', files[i]);

      addPlaceImage(placeId, fd).then(() =>
        fetchPlace(placeId)
      );
    }


    const repeat = (times, i = 0) => {
      return (func) => {
        return (...args) => {
          if(times > 0) {
            func(i, ...args);
            repeat(times - 1, i + 1)(func)(...args);
          }
        }
      }
    }

    repeat(fileLength)(createImage)(files);
  }

  handleClickDeleteImage(imageId) {
    return (event) => {
      event.preventDefault();
      const {deletePlaceImage, fetchPlace, placeId} = this.props;
      deletePlaceImage(imageId).then(() =>
        fetchPlace(placeId)
      )
    }
  }

  render() {
    const {place} = this.props;

    return (
      <div>
        <h2>Place Detail</h2>
        <div>{place.name}</div>        

        <input ref='file' type='file' name='file' multiple='true' onChange={this.handleChangeFile}/>

        {(place.images || []).map(img =>
          <PlaceImage
            src={`http://localhost:5000${img.url}`}
            key={`img-${img.id}`}
            onClickDelete={this.handleClickDeleteImage(img.id)}
            />
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    placeId: ownProps.match.params.placeId,
    place: state.places.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlace: (...args) =>
      dispatch(fetchPlace(...args)),
    addPlaceImage: (...args) =>
      dispatch(addPlaceImage(...args)),
    deletePlaceImage: (...args) =>
      dispatch(deletePlaceImage(...args)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceImages);
