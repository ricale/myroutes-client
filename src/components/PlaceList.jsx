import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

import Icon from 'components/Icon';
import pathHelper from 'utils/pathHelper';

import './placeList.less'

class Place extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickUp = this.handleClickUp.bind(this);
    this.handleClickDown = this.handleClickDown.bind(this);
  }

  handleClick(event) {
    const {onClick, place} = this.props;
    onClick(event, place);
  }

  handleClickUp(event) {
    this.props.onChangeOrder('up');
  }

  handleClickDown(event) {
    this.props.onChangeOrder('down');
  }

  render() {
    const {place, editable, active, onChangeName} = this.props;

    return (
      <div className={`${active ? 'active' : ''} place-list__place`} onClick={this.handleClick}>
        {!editable && !isNaN(place.odr) &&
          <div className='place-list__place-index'>{place.odr + 1}</div>
        }
        <div className='place-list__place-name'>
          {editable && <input onChange={onChangeName} value={place.name} />}
          {!editable && place.name}
        </div>
        <div className='place-list__place-address'>{place.address}</div>
        <div className='place-list__place-position'>{`${numeral(place.latitude).format('0.000')},${numeral(place.longitude).format('0.000')}`}</div>
        <Link to={pathHelper.places.detail(place.route_id, place.id)}>상세</Link>
        {editable &&
          <span className='place-list__place-button up' onClick={this.handleClickUp}>
            <Icon name='arrow-up white' />
          </span>
        }
        {editable &&
          <span className='place-list__place-button down' onClick={this.handleClickDown}>
            <Icon name='arrow-down white' />
          </span>
        }
      </div>
    )
  }
};

export default class PlaceList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: undefined
    };
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  handleClickItem(event, place) {
    const {onClickItem} = this.props;

    if(onClickItem) {
      this.setState({active: place.id}, () =>
        this.props.onClickItem(event, place)
      );
    }
  }

  isActive(id) {
    const {active} = this.state;
    return active !== undefined && active === id
  }

  render() {
    const {
      places,
      editable,
      onClickItem,
      onChangePlaceName,
      onChangePlaceOrder,
      className,
      ...attrs
    } = this.props;

    return (
      <div {...attrs} className={`place-list ${className || ''}`}>
        {(places || []).map((p,i) => 
          <Place
            key={`place-${i}`}
            place={p}
            active={this.isActive(p.id)}
            onClick={this.handleClickItem}
            onChangeName={(event) => onChangePlaceName(i, event.target.value)}
            onChangeOrder={(direction) => onChangePlaceOrder(i, direction)}
            editable={editable}
            />
        )}
      </div>
    )
  }
}
