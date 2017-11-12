import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

import {fetchPlace, addPlaceImage, deletePlaceImage} from 'actions/places';
import pathHelper from 'utils/pathHelper'
import PlaceImage from 'components/PlaceImage';

import './detail.less';

class PlaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.handleChangeFile = this.handleChangeFile.bind(this);
  }
  componentDidMount() {
    console.log('PlaceDetail componentDidMount');
    const {fetchPlace, id} = this.props;
    fetchPlace(id);
  }

  componentWillReceiveProps(newProps) {
    const {id, fetchPlace} = this.props;
    const {id: newId} = newProps;

    if(id !== newId) {
      fetchPlace(newId);
    }
  }

  handleChangeFile(event) {
    const {addPlaceImage, fetchPlace, id} = this.props;

    const files = this.refs.file.files;
    const fileLength = files.length;
    const createImage = (i) => {
      const fd = new FormData();
      fd.append('file', files[i]);
      return addPlaceImage(id, fd)
    }

    Promise.all(
      [...Array(fileLength).keys()].map(createImage)
    ).then(() =>
      fetchPlace(id)
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
      <div className='place-detail'>
        <h2 className='place-detail__name'>{place.name}</h2>
        <div className='place-detail__position'>{`${numeral(place.latitude).format('0.000')},${numeral(place.longitude).format('0.000')}`}</div>

        <div className='place-detail__menu'>
          <input
            ref='file'
            type='file'
            name='file'
            multiple='true'
            accept=".jpg, .jpeg, .png, .gif"
            onChange={this.handleChangeFile} />
          <Link to={pathHelper.routes.detail(place.route_id)}>뒤로</Link>
        </div>

        <div className='place-detail__images'>
          {(place.images || []).map(img =>
            <PlaceImage
              src={`http://localhost:5000${img.thumbnail1url}`}
              key={`img-${img.id}`}
              onClickDelete={this.handleClickDeleteImage(img.id)}
              />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.match.params.id,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);
