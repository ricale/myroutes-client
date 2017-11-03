import React, {Component} from 'react';

export default class DaumMap extends Component {
  static defaultProps = {
    markable: true,
    searchable: true
  };

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      searchResult: [],
      initialMarkers: undefined
    };

    this.markers = [];
    this.searchMarkers = [];
    this.handleRightClickMap = this.handleRightClickMap.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handlePressKeyOnKeywordInput = this.handlePressKeyOnKeywordInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const {initialMarkers, markers} = this.props;

    this.initMap();
    this.initMarkers(initialMarkers || markers);

    if(this.props.searchable) {
      this.initSearcher();
    }
  }

  componentWillReceiveProps(newProps) {
    const {markers} = this.props;
    const {markers: newMarkers} = newProps;

    if(markers !== newMarkers) {
      this.removeAllMarkers();
      this.initMarkers(newProps.markers);
    }
  }

  handleRightClickMap(mouseEvent) {
    const latlng = mouseEvent.latLng;
    this.addMarker({latlng});
  }

  handleChangeKeyword(event) {
    this.setState({keyword: event.target.value});
  }

  handlePressKeyOnKeywordInput(event) {
    if(event.key === 'Enter') {
      this.handleSearch();
    }
  }

  handleChangeSearchResultPage(index) {
    this.removeAllSearchMarkers();
    this.state.searchPagination.gotoPage(index);
  }

  handleMouseOverResult(index, title) {
    this.displayInfoWindow(this.searchMarkers[index], title);
  }

  handleSearch() {
    const {keyword} = this.state;

    this.removeAllSearchMarkers();

    const afterSearch = (data, status, pagination) => {
      switch(status) {
        case daum.maps.services.Status.OK:
          this.displayPlaces(data);
          this.setState({searchPagination: pagination})
          break;
        case daum.maps.services.Status.ZERO_RESULT:

          break;
        case daum.maps.services.Status.ERROR:
          this.setState({searchResult: []});
          break;
      }
    };

    const searchOptions = {
      location: this.map.getCenter(),
      size: 5
    };

    this.ps.keywordSearch(keyword, afterSearch, searchOptions);
  }

  initMap() {
    const {markable} = this.props;

    this.map = new daum.maps.Map(this.refs.mapContainer, {
      center: new daum.maps.LatLng(37.563115650880825, 126.96517864826323),
      level: 4
    });

    if(markable) {
      daum.maps.event.addListener(this.map, 'rightclick', this.handleRightClickMap);
    }
  }

  initMarkers(markers = this.props.markers) {
    const bounds = new daum.maps.LatLngBounds();

    (markers || []).forEach(m => {
      this.addMarker(m, {noCallback: true, name: m.name});
      bounds.extend(this.markers[this.currentMarker].getPosition());
    });

    if(!bounds.isEmpty()) {
      this.map.setBounds(bounds);
    }
  }

  initSearcher() {
    this.ps = new daum.maps.services.Places();
    this.infoWindow = new daum.maps.InfoWindow({zIndex: 1});
  }

  displayPlaces(places) {
    const bounds = new daum.maps.LatLngBounds();

    places.forEach((p, i) => {
      const latlng = new daum.maps.LatLng(p.y, p.x);
      const marker = this.addSearchMarker(latlng, p);

      daum.maps.event.addListener(marker, 'mouseover', () =>
        this.displayInfoWindow(marker, p.place_name)
      );

      daum.maps.event.addListener(marker, 'mouseout', () =>
        this.infoWindow.close()
      );

      bounds.extend(latlng);
    });

    this.map.setBounds(bounds);
    this.setState({searchResult: places});
  }

  displayInfoWindow(marker, title) {
    this.infoWindow.setContent(`<div style="padding:5px;z-index:1;">${title}</div>`);
    this.infoWindow.open(this.map, marker);
  }

  createMarker(options = {}) {
    if(!options.latlng) {
      options.latlng = new daum.maps.LatLng(options.latitude, options.longitude);
    }
    options.draggable === undefined && (options.draggable = true);

    return new daum.maps.Marker(Object.assign({
      map: this.map,
      position: options.latlng
    }, options));
  }

  addMarker(position, options = {}) {
    const marker = this.createMarker(position);

    this.markers.push(marker);
    const index = this.markers.length - 1
    this.currentMarker = index;

    const handleChangeCurrentMarker = () => this.currentMarker = index;

    daum.maps.event.addListener(marker, 'click',     handleChangeCurrentMarker);
    daum.maps.event.addListener(marker, 'dragstart', handleChangeCurrentMarker);
    daum.maps.event.addListener(marker, 'dragend',   () => {
      const {onMoveMarker} = this.props;
      const _latlng = marker.getPosition();
      onMoveMarker && onMoveMarker(index, _latlng.getLat(), _latlng.getLng());
    });

    daum.maps.event.addListener(marker, 'mouseover', () =>
      this.displayInfoWindow(marker, options.name)
    );

    daum.maps.event.addListener(marker, 'mouseout', () =>
      this.infoWindow.close()
    );

    daum.maps.event.addListener(marker, 'rightclick', () => {
      const i = this.markers.indexOf(marker);
      if(i !== -1) {
        this.markers.splice(i, 1);
        marker.setMap(null);
        this.infoWindow.close();

        const {onDeleteMarker} = this.props;
        onDeleteMarker && onDeleteMarker(i);
      }
    });

    const {onCreateMarker} = this.props;
    if(!options.noCallback) {
      const latlng = marker.getPosition();
      onCreateMarker && onCreateMarker(
        this.currentMarker,
        latlng.getLat(),
        latlng.getLng(),
        {name: options.name}
      );
    }
  }

  addSearchMarker(latlng, place) {
    const image = new daum.maps.MarkerImage(
      'public/images/marker.png',
      new daum.maps.Size(32, 32)
    );
    const marker = this.createMarker({
      latlng,
      draggable: false,
      image
    });

    const {markable} = this.props;

    if(this.props.markable) {
      daum.maps.event.addListener(marker, 'rightclick', () =>
        this.addMarker({latlng: marker.getPosition()}, {name: place.place_name})
      );
    }

    this.searchMarkers.push(marker);

    return marker;
  }

  removeAllMarkers() {
    this.markers.forEach(marker =>
      marker.setMap(null)
    );
    this.markers = [];    
  }

  removeAllSearchMarkers() {
    this.searchMarkers.forEach(marker =>
      marker.setMap(null)
    );
    this.searchMarkers = [];
  }

  render() {
    const {
      onCreateMarker,
      onMoveMarker,
      onDeleteMarker,
      markers,
      markable,
      searchable,
      initialMarkers,
      ...attrs
    } = this.props;

    const {keyword, searchResult, searchPagination} = this.state;

    return (
      <div {...attrs}>
        <h3>Daum Map</h3>
        <div style={{display: 'inline-block'}}>
          <div ref="mapContainer" style={{height: 500, width: 500, display: 'inline-block'}}></div>
          <p>빈 곳에 우클릭: 장소 생성, 장소 우클릭: 장소 삭제</p>
        </div>
        {searchable &&
          <div style={{display: 'inline-block', verticalAlign: 'top'}}>
            <input
              type='text'
              value={keyword}
              onChange={this.handleChangeKeyword}
              onKeyPress={this.handlePressKeyOnKeywordInput}
              />
            <button onClick={this.handleSearch}>검색</button>
            <div>
              {searchResult.map((r,i) =>
                <div key={`search-result-${i}`} onMouseOver={() => this.handleMouseOverResult(i, r.place_name)}>
                  <div>{r.place_name}</div>
                  <div>{r.road_address_name}</div>
                  <div>{r.address_name}</div>
                  <div>{r.phone}</div>
                </div>
              )}
              {searchPagination &&
                [...Array(searchPagination.last).keys()].map(i =>
                  <span key={`search-pagination-${i}`}>
                    <a onClick={() => this.handleChangeSearchResultPage(i+1)} style={{margin: 10}}>
                      {i + 1}
                    </a>
                  </span>
                )
              }
            </div>
          </div>
        }
      </div>
    )
  }
}
