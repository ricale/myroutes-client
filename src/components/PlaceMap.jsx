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
      children,
      places,
      initialPlaces,
      activePlaceId,

      markable,
      editable,
      searchable,
      hasPath,

      onClickPlace,
      onChangePlaceName,
      onChangePlaceOrder,
      onRemovePlace,
      onCreateMarker,
      onMoveMarker,
      onDeleteMarker,
    } = this.props;

    const selectedPlaceIndex = places.map((p,i) =>
      p.id === activePlaceId ? i : null
    ).filter(i =>
      i !== null
    )[0];

    return (
      <div className={className || 'place-map'}>
        <DaumMap
          className='place-map__map'
          places={places}
          initialPlaces={initialPlaces}
          selectedPlaceIndex={selectedPlaceIndex}
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
          activePlaceId={activePlaceId}

          editable={editable}

          onClickItem={onClickPlace}
          onChangePlaceName={onChangePlaceName}
          onChangePlaceOrder={onChangePlaceOrder}
          onRemovePlace={onRemovePlace}
          />

        {children}
      </div>
    );
  }
}
