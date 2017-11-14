import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {fetchRoute, deleteRoute} from 'actions/routes';
import {fetchPlace} from 'actions/places';

import PlaceMap from 'components/PlaceMap';
import PlaceImage from 'components/PlaceImage';
import IconButton from 'components/IconButton';
import pathHelper from 'utils/pathHelper';

import './detail.less';

class RouteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlaceId: undefined
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickPlace = this.handleClickPlace.bind(this);
    this.handleClickShowAllImages = this.handleClickShowAllImages.bind(this);
  }

  componentDidMount() {
    console.log('RouteDetail componentDidMount');
    const {fetchRoute, id} = this.props;
    fetchRoute(id);
  }

  componentWillReceiveProps(newProps) {
    const {route, id, fetchRoute} = this.props;
    const {
      route: newRoute,
      id: newId
    } = newProps;

    if(id !== newId) {
      fetchRoute(newId);

    } else if(route.id !== newRoute.id) {
      this.setState({places: newRoute.places || []});
    }
  }

  handleClickDelete(event) {
    event.preventDefault();
    const {deleteRoute, goToList, id} = this.props;
    deleteRoute(id).then(() =>
      goToList()
    );
  }

  handleClickPlace(event, place) {
    this.setState({activePlaceId: place.id, showAllImages: false}, () =>
      this.props.fetchPlace(this.state.activePlaceId)
    );
  }

  handleClickShowAllImages(event) {
    const toggled = !this.state.showAllImages;
    this.setState({showAllImages: toggled, activePlaceId: undefined});
  }

  hasActivePlace() {
    const {activePlaceId} = this.state;
    const {place} = this.props;

    return activePlaceId && place && activePlaceId === place.id;
  }

  showWholeRouteImages() {
    const {showAllImages} = this.state;

    return showAllImages;
  }

  render() {
    const {route, place} = this.props;
    const {activePlaceId} = this.state;

    if(!route || !route.id) {
      return <div></div>
    }

    return (
      <div className='route-detail'>
        <div className='route-detail__header'>
          <h2 className='route-detail__name'>{route.name}</h2>
          <ul className='route-detail__menu'>
            <li>
              <IconButton to={pathHelper.routes.edit(route.id)} iconName='edit'/>
            </li>
            <li>
              <IconButton onClick={this.handleClickDelete} iconName='remove' />
            </li>
          </ul>
        </div>

        <div className='route-detail__content'>
          <PlaceMap
            onClickPlace={this.handleClickPlace}
            places={route.places}
            markers={route.places}
            activePlaceId={activePlaceId}
            markable={false}
            editable={false}
            searchable={false}
            hasPath={true}
            >
            <IconButton onClick={this.handleClickShowAllImages} className='route-detail__show-all-image-button' iconName='photo' />
          </PlaceMap>

          {this.hasActivePlace() &&
            place.images.map(img =>
              <PlaceImage
                width={128}
                src={`http://localhost:5000${img.thumbnail2url}`}
                originalSrc={`http://localhost:5000${img.url}`}
                key={`img-${img.id}`}
                />
            )
          }

          {this.showWholeRouteImages() &&
            route.images.map(img =>
              <PlaceImage
                width={128}
                src={`http://localhost:5000${img.thumbnail2url}`}
                originalSrc={`http://localhost:5000${img.url}`}
                key={`img-${img.id}`}
                />
            )
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.match.params.id,
    route: state.routes.current,
    place: state.places.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRoute: (...args) =>
      dispatch(fetchRoute(...args)),
    deleteRoute: (...args) =>
      dispatch(deleteRoute(...args)),
    fetchPlace: (...args) =>
      dispatch(fetchPlace(...args)),
    goToList: (...args) =>
      dispatch(push(pathHelper.routes.list()))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetail);
