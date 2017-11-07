import React, {Component} from 'react';

import DaumMap from 'components/Map';
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
      activePlace,

      markable,
      editable,
      searchable,
      hasPath,

      onClickPlace,
      onChangePlaceName,
      onChangePlaceOrder,
      onCreateMarker,
      onMoveMarker,
      onDeleteMarker,
    } = this.props;

    return (
      <div className={className || 'place-map'}>
        <DaumMap
          className='place-map__map'
          markers={places}
          initialMarkers={initialPlaces}
          markable={markable}
          searchable={searchable}
          hasPath={hasPath}

          onCreateMarker={onCreateMarker}
          onMoveMarker={onMoveMarker}
          onDeleteMarker={onDeleteMarker}
          onClickMarker={onClickPlace}
          />

        <PlaceList
          className='place-map__place-list'
          places={places}
          activePlace={activePlace}

          editable={editable}

          onClickItem={onClickPlace}
          onChangePlaceName={onChangePlaceName}
          onChangePlaceOrder={onChangePlaceOrder}
          />
      </div>
    );
  }
}
