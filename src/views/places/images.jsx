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

    const fd = new FormData();
    fd.append('file', this.refs.file.files[0]);

    addPlaceImage(placeId, fd).then(() =>
      fetchPlace(placeId)
    );
  }

  handleClickDeleteImage(imageId) {
    return (event) => {
      event.preventDefault();
      const {deletePlaceImage, fetchPlace, id} = this.props;
      deletePlaceImage(imageId).then(() =>
        fetchPlace(id)
      )
    }
  }

  render() {
    const {place} = this.props;

    return (
      <div>
        <h2>Place Detail</h2>
        <div>{place.name}</div>        

        <input ref='file' type='file' name='file' onChange={this.handleChangeFile}/>

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
