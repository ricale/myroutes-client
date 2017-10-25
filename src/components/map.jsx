import React, {Component} from 'react';

export default class DaumMap extends Component {
  constructor(props) {
    super(props);
    this.markers = [];
    this.handleClickMap = this.handleClickMap.bind(this);
    this.handleRightClickMap = this.handleRightClickMap.bind(this);
  }

  componentDidMount() {
    const {markers} = this.props;
    const {LatLng, event} = daum.maps;

    this.map = new daum.maps.Map(this.refs.mapContainer, {
      center: new LatLng(37.563115650880825, 126.96517864826323),
      level: 4
    });

    event.addListener(this.map, 'click',      this.handleClickMap);
    event.addListener(this.map, 'rightclick', this.handleRightClickMap);

    (markers || []).forEach(m =>
      this.addMarker(m)
    );
  }

  handleClickMap(mouseEvent) {
    const {onMoveMarker} = this.props;

    const latlng = mouseEvent.latLng;
    const latitude = latlng.getLat();
    const longitude = latlng.getLng();
    const currentMarker = this.markers[this.currentMarker];

    if(currentMarker) {
      currentMarker.setPosition(latlng);
      onMoveMarker && onMoveMarker(this.currentMarker, latitude, longitude);
    }
  }

  handleRightClickMap(mouseEvent) {
    const {onCreateMarker} = this.props;

    const latlng = mouseEvent.latLng;

    this.addMarker({latlng});
    onCreateMarker && onCreateMarker(this.currentMarker, latlng.getLat(), latlng.getLng());
  }

  addMarker(data) {
    const {LatLng, event, Marker} = daum.maps;

    if(data.latlng) {
      data.latitude = data.latlng.getLat();
      data.longitude = data.latlng.getLng();
    } else {
      data.latlng = new LatLng(data.latitude, data.longitude);
    }

    const {latlng, latitude, longitude} = data;

    const marker = new Marker({
      map: this.map,
      position: latlng,
      draggable: true
    });

    this.markers.push(marker);
    const index = this.markers.length - 1
    this.currentMarker = index;

    const handleChangeCurrentMarker = () => this.currentMarker = index;

    event.addListener(marker, 'click',     handleChangeCurrentMarker);
    event.addListener(marker, 'dragstart', handleChangeCurrentMarker);
    event.addListener(marker, 'dragend',   () => {
      const {onMoveMarker} = this.props;
      const _latlng = marker.getPosition();
      onMoveMarker && onMoveMarker(index, _latlng.getLat(), _latlng.getLng());
    });
  }

  render() {
    return (
      <div>
        <h3>Daum Map</h3>
        <div ref="mapContainer" style={{height: 500, width: 500}}></div>
      </div>
    )
  }
}
