import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import pathHelper from 'utils/pathHelper';

class Place extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {place, editable, onChangeName} = this.props;

    return (
      <div style={{padding: 10, backgroundColor: '#EFEFEF', margin: 1}}>
        <div>
          {editable && <input onChange={onChangeName} value={place.name} />}
          {!editable && place.name}
        </div>
        <div>{place.address}</div>
        <div>{place.latitude}</div>
        <div>{place.longitude}</div>
        <Link to={pathHelper.places.detail(place.route_id, place.id)}>상세</Link>
      </div>
    )
  }
};

export default class PlaceList extends Component {
  render() {
    const {places, editable, onChangePlaceName, ...attrs} = this.props;
    return (
      <div {...attrs}>
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
