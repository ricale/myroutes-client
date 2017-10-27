import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchRoute} from 'actions/routes';

import DaumMap from 'components/map';
import PlaceList from 'components/PlaceList';

class RouteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      places: []
    };
    this.handleCreateMarker = this.handleCreateMarker.bind(this);
    this.handleMoveMarker = this.handleMoveMarker.bind(this);
  }

  componentDidMount() {
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

  handleCreateMarker(index, latitude, longitude) {
    const {places} = this.state;
    places[index] = {
      name: `place-${index}`,
      latitude,
      longitude
    };

    this.setState({places});
  }

  handleMoveMarker(index, latitude, longitude) {
    const {places} = this.state;
    places[index].latitude = latitude;
    places[index].longitude = longitude;

    this.setState({places});
  }

  render() {
    const {route} = this.props;
    const {places} = this.state;

    if(!route || !route.id) {
      return <div></div>
    }

    return (
      <div>
        <h2>Route Detail</h2>
        <div>{route.name}</div>
        <PlaceList
          places={places}
          />
        <DaumMap
          markers={places}
          markable={false}
          onCreateMarker={this.handleCreateMarker}
          onMoveMarker={this.handleMoveMarker}
          />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.match.params.id,
    route: state.routes.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRoute: (...args) =>
      dispatch(fetchRoute(...args))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetail);
