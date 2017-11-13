import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

import LoadingIndicator from 'components/LoadingIndicator';
import IconButton from 'components/IconButton';
import pathHelper from 'utils/pathHelper'

import './Header.less';

class Header extends Component {
  render() {
    const {loading} = this.props;

    return (
      <div className='header'>
        <h1><Link to={pathHelper.routes.list()}>myroutes</Link></h1>
        <ul className='header__menu'>
          <li>
            <IconButton to={pathHelper.routes.new()} iconName='plus' />
          </li>
        </ul>

        <LoadingIndicator show={loading} />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.common.loading
  };
}

export default connect(mapStateToProps)(Header)
