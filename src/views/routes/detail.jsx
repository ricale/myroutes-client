import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {push} from 'react-router-redux';

import {fetchRoute, deleteRoute} from 'actions/routes';

import PlaceMap from 'components/PlaceMap';
import pathHelper from 'utils/pathHelper';

class RouteDetail extends Component {
  constructor(props) {
    super(props);
    this.handleClickDelete = this.handleClickDelete.bind(this);
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

  render() {
    const {route} = this.props;

    if(!route || !route.id) {
      return <div></div>
    }

    return (
      <div>
        <h2>Route Detail</h2>
        <div>{route.name}</div>
        <Link to={pathHelper.routes.edit(route.id)}>수정</Link>
        <a href='#' onClick={this.handleClickDelete}>삭제</a>
        <PlaceMap
          places={route.places}
          markers={route.places}
          markable={false}
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
      dispatch(fetchRoute(...args)),
    deleteRoute: (...args) =>
      dispatch(deleteRoute(...args)),
    goToList: (...args) =>
      dispatch(push(pathHelper.routes.list()))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetail);
