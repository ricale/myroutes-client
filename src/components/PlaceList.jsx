import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

import pathHelper from 'utils/pathHelper';

import './placeList.less'

class Place extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const {onClick, place} = this.props;
    onClick(event, place);
  }

  render() {
    const {place, editable, active, onChangeName} = this.props;

    return (
      <div className={`${active ? 'active' : ''} place-list__place`} onClick={this.handleClick}>
        <div className='place-list__place-name'>
          {editable && <input onChange={onChangeName} value={place.name} />}
          {!editable && place.name}
        </div>
        <div className='place-list__place-address'>{place.address}</div>
        <div className='place-list__place-position'>{`${numeral(place.latitude).format('0.000')},${numeral(place.longitude).format('0.000')}`}</div>
        <Link to={pathHelper.places.detail(place.route_id, place.id)}>상세</Link>
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
    this.setState({active: place.id}, () =>
      this.props.onClickItem(event, place)
    );
  }

  render() {
    const {
      places,
      editable,
      onClickItem,
      onChangePlaceName,
      className,
      ...attrs
    } = this.props;

    const {active} = this.state;

    return (
      <div {...attrs} className={`place-list ${className || ''}`}>
        {(places || []).map((p,i) => 
          <Place
            key={`place-${i}`}
            place={p}
            active={active === p.id}
            onClick={this.handleClickItem}
            onChangeName={(event) => onChangePlaceName(i, event.target.value)}
            editable={editable}
            />
        )}
      </div>
    )
  }
}
