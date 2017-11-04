import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import {fetchRouteList} from 'actions/routes'
import pathHelper from 'utils/pathHelper'

import './list.less';

class RouteList extends Component {
  componentDidMount() {
    console.log('RouteList componentDidMount');
    this.props.fetchRouteList();
  }

  render() {
    const {routes} = this.props;

    return (
      <div className='route-list'>
        <h2>Route List</h2>
        <ul>
          <li className='route-list__header'>이름</li>
          {(routes || []).map(r =>
            <Link key={`route-${r.id}`} to={pathHelper.routes.detail(r.id)}>
              <li className='route-list__route'>
                  {r.name}
              </li>
            </Link>
          )}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    routes: (state.routes || {}).list
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRouteList: (...args) =>
      dispatch(fetchRouteList(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteList);
