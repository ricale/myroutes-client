import React, {Component} from 'react';

import DaumMap from 'components/map';
import PlaceList from 'components/PlaceList';

export default class PlaceMap extends Component {
  static defaultProps = {
    listStyle: {display: 'inline-block'},
    mapStyle: {display: 'inline-block'},

    editable: true,
  };

  render() {
    const {
      places,
      initialPlaces,

      markable,
      editable,

      onChangePlaceName,
      onCreateMarker,
      onMoveMarker,
      onDeleteMarker,

      listStyle,
      mapStyle
    } = this.props;

    return (
      <div>
        <PlaceList
          style={listStyle}
          places={places}
          editable={editable}
          onChangePlaceName={onChangePlaceName}
          />

        <DaumMap
          markers={places}
          style={mapStyle}
          initialMarkers={initialPlaces}
          onCreateMarker={onCreateMarker}
          onMoveMarker={onMoveMarker}
          onDeleteMarker={onDeleteMarker}
          />
      </div>
    );
  }
}
