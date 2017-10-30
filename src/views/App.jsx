import React, {Component} from 'react';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    const {loading} = this.props;

    const display = loading ? 'block' : 'none';

    return (
      <div>
        <h1>App</h1>

        <div style={{
          display,
          backgroundColor: 'white',
          opacity: 0.75,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}></div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.common.loading
  };
}

export default connect(mapStateToProps)(App)
