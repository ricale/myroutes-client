import React, {Component} from 'react';

import DaumMap from 'components/map';
import PlaceList from 'components/PlaceList';

import './PlaceMap.less';

export default class PlaceMap extends Component {
  static defaultProps = {
    editable: true,
  };

  render() {
    const {
      className,
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
      <div className={className || 'place-map'}>
        <PlaceList
          className='place-map__place-list'
          style={listStyle}
          places={places}
          editable={editable}
          onChangePlaceName={onChangePlaceName}
          />

        <DaumMap
          className='place-map__map'
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
