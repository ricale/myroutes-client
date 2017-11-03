import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

import pathHelper from 'utils/pathHelper';

import './placeList.less'

class Place extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {place, editable, onChangeName} = this.props;

    return (
      <div className='place-list__place'>
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
  render() {
    const {places, editable, onChangePlaceName, className, ...attrs} = this.props;
    return (
      <div {...attrs} className={`place-list ${className}`}>
        {(places || []).map((p,i) => 
          <Place
            key={`place-${i}`}
            place={p}
            onChangeName={(event) => onChangePlaceName(i, event.target.value)}
            editable={editable}
            />
        )}
      </div>
    )
  }
}
