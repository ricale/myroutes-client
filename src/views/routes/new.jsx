import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createRoute} from 'actions/routes';

import RouteForm from './form';

class NewRoute extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(data) {
    this.props.createRoute(data).then((...args) =>
      console.log('1', args)
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
      dispatch(createRoute(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewRoute);
