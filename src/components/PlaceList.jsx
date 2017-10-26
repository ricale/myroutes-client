import React, {Component} from 'react';

class Place extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {place, editable, onChangeName} = this.props;

    return (
      <div>
        <div>
          {editable && <input onChange={onChangeName} value={place.name} />}
          {!editable && place.name}
        </div>
        <div>{place.address}</div>
        <div>{place.latitude}</div>
        <div>{place.longitude}</div>
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
