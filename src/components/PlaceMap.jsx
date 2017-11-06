import React, {Component} from 'react';

import DaumMap from 'components/map';
import PlaceList from 'components/PlaceList';

import './PlaceMap.less';

export default class PlaceMap extends Component {
  static defaultProps = {
    editable: true,
    searchable: true
  };

  render() {
    const {
      className,
      places,
      initialPlaces,

      markable,
      editable,
      searchable,

      onClickPlace,
      onChangePlaceName,
      onChangePlaceOrder,
      onCreateMarker,
      onMoveMarker,
      onDeleteMarker,

      listStyle,
      mapStyle
    } = this.props;

    return (
      <div className={className || 'place-map'}>
        <DaumMap
          className='place-map__map'
          markers={places}
          style={mapStyle}
          initialMarkers={initialPlaces}
          onCreateMarker={onCreateMarker}
          onMoveMarker={onMoveMarker}
          onDeleteMarker={onDeleteMarker}
          searchable={searchable}
          />

        <PlaceList
          className='place-map__place-list'
          style={listStyle}
          places={places}
          editable={editable}
          onClickItem={onClickPlace}
          onChangePlaceName={onChangePlaceName}
          onChangePlaceOrder={onChangePlaceOrder}
          />
      </div>
    );
  }
}
