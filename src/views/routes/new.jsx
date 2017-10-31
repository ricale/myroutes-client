import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {createRoute} from 'actions/routes';

import pathHelper from 'utils/pathHelper'
import RouteForm from './form';

class NewRoute extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    console.log('NewRoute componentDidMount');
  }

  handleSubmit(data) {
    const {createRoute, goToDetail} = this.props;
    createRoute(data).then(action =>
      goToDetail(action.payload.id)
    );
  }

  render() {
    return (
      <div>
        <h2>New Route</h2>
        <RouteForm onSubmit={this.handleSubmit} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    createRoute: (...args) =>
      dispatch(createRoute(...args)),
    goToDetail: (...args) =>
      dispatch(push(pathHelper.routes.detail(
        ...args
      )))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoute);
