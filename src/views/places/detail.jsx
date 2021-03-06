import React, {Component} from 'react';
import {connect} from 'react-redux';
import numeral from 'numeral';

import {fetchPlace, addPlaceImage, deletePlaceImage} from 'actions/places';
import PlaceImage from 'components/PlaceImage';
import IconButton from 'components/IconButton';
import pathHelper from 'utils/pathHelper'
import sessionHelper from 'utils/sessionHelper'
import {API_HOST} from 'utils/constants';

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
    const uploadImage = (args) => () => addPlaceImage(...args).then(() => fetchPlace(args[0]));

    const files = this.refs.file.files;
    const fileLength = files.length;

    [...Array(fileLength).keys()].map(i =>
      [
        id, {
          body: files[i],
          filename: event.target.value.slice('C:\\fakepath\\'.length)
        }
      ]

    ).reduce((p, args) =>
      p ? p.then(uploadImage(args)) : uploadImage(args)()

    , undefined)
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
    const {place, hasSession} = this.props;

    const images = (place.images || []).filter(img => !!img.image);

    return (
      <div className='place-detail'>
        <h2 className='place-detail__name'>{place.name}</h2>
        <div className='place-detail__position'>{`${numeral(place.latitude).format('0.000')},${numeral(place.longitude).format('0.000')}`}</div>

        {hasSession &&
          <div className='place-detail__menu'>
            <input
              ref='file'
              type='file'
              name='file'
              multiple='true'
              accept=".jpg, .jpeg, .png, .gif"
              onChange={this.handleChangeFile} />
            <IconButton to={pathHelper.routes.detail(place.route_id)} iconName='arrow-left' />
          </div>
        }

        <div className='place-detail__images'>
          {images.map(img =>
            <PlaceImage
              src={`${API_HOST}${img.thumbnail1}`}
              key={`img-${img.id}`}
              onClickDelete={hasSession && this.handleClickDeleteImage(img.id)}
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
    place: state.places.current,
    hasSession: sessionHelper.hasToken()
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
