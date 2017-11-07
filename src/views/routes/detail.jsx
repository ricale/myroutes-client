import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {push} from 'react-router-redux';

import {fetchRoute, deleteRoute} from 'actions/routes';
import {fetchPlace} from 'actions/places';

import PlaceMap from 'components/PlaceMap';
import PlaceImage from 'components/PlaceImage';
import pathHelper from 'utils/pathHelper';

import './detail.less';

class RouteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePlace: undefined
    };
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickPlace = this.handleClickPlace.bind(this);
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
    this.setState({activePlace: place.id}, () =>
      this.props.fetchPlace(this.state.activePlace)
    );
  }

  hasActivePlace() {
    const {activePlace} = this.state;
    const {place} = this.props;

    return activePlace && place && activePlace === place.id;
  }

  render() {
    const {route, place} = this.props;

    if(!route || !route.id) {
      return <div></div>
    }

    return (
      <div className='route-detail'>
        <div className='route-detail__header'>
          <h2 className='route-detail__name'>{route.name}</h2>
          <ul className='route-detail__menu'>
            <li><Link to={pathHelper.routes.edit(route.id)}>수정</Link></li>
            <li><a href='#' onClick={this.handleClickDelete}>삭제</a></li>
          </ul>
        </div>

        <PlaceMap
          onClickPlace={this.handleClickPlace}
          places={route.places}
          markers={route.places}
          markable={false}
          editable={false}
          searchable={false}
          hasPath={true}
          />

        {this.hasActivePlace() &&
          <div className='route-detail__place-images'>
            {place.images.map(img =>
              <PlaceImage
                src={`http://localhost:5000${img.url}`}
                key={`img-${img.id}`}
                />
            )}
          </div>
        }
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
