import React, {Component} from 'react';

import './Map.less';

export default class DaumMap extends Component {
  static defaultProps = {
    markable: true,
    searchable: true,
    hasPath: false
  };

  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      searchResult: []
    };

    this.markers = [];
    this.searchMarkers = [];
    this.handleRightClickMap = this.handleRightClickMap.bind(this);
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handlePressKeyOnKeywordInput = this.handlePressKeyOnKeywordInput.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    const {initialPlaces, places, hasPath, searchable} = this.props;

    this.initMap();
    this.initMarkers(initialPlaces || places);

    if(hasPath) {
      this.initPath();
    }

    this.initInfoWindow();

    if(searchable) {
      this.initSearcher();
    }
  }

  componentWillUnmount() {
    this.removeAllMarkers();
    this.removeAllSearchMarkers();
    this.removePath();

    if(this.selectedMarker) {
      this.selectedMarker.setMap(null);
      this.selectedMarker = null;
    }

    this.infoWindow = null;
    this.ps = null;
  }

  componentWillReceiveProps(newProps) {
    const {places, selectedPlaceIndex} = this.props;
    const {
      places: newPlaces,
      selectedPlaceIndex: newSelectedPlaceIndex
    } = newProps;

    if(places !== newPlaces) {
      this.removeAllMarkers();
      this.initMarkers(newProps.places);

      this.removePath();
      this.initPath();
    }

    if(selectedPlaceIndex !== newSelectedPlaceIndex) {
      if(!newSelectedPlaceIndex) {
        this.hideSelectedPlaceMarker();
      } else {
        this.showSelectedPlaceMarker(this.markers[newSelectedPlaceIndex].getPosition());
      }
    }
  }

  handleRightClickMap(mouseEvent) {
    const latlng = mouseEvent.latLng;
    this.addPlaceMarker({latlng});
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

    this.map.addControl(
      new daum.maps.ZoomControl(),
      daum.maps.ControlPosition.RIGHT
    );

    if(markable) {
      daum.maps.event.addListener(this.map, 'rightclick', this.handleRightClickMap);
    }
  }

  initMarkers(places = this.props.places) {
    const bounds = new daum.maps.LatLngBounds();

    (places || []).forEach(m => {
      this.addPlaceMarker(m, {noCallback: true, name: m.name});
      bounds.extend(this.markers[this.currentMarkerIndex].getPosition());
    });

    if(!bounds.isEmpty()) {
      this.map.setBounds(bounds);
    }
  }

  initPath() {
    this.path = new daum.maps.Polyline({
      map: this.map,
      path: this.markers.map(m => m.getPosition()),
      strokeWeight: 3,
      strokeColor: '#DB4040',
      strokeOpacity: 1
    })

    this.startPoint = new daum.maps.CustomOverlay({
      map: this.map,
      position: this.markers[0].getPosition(),
      clickable: false,
      xAnchor: 0,
      yAnchor: 1,
      content: `<div style="background-color: white; padding: 3px; border: 1px solid #AAA;">
        <span class="center">출발</span>
      </div>`
    });

    this.endPoint = new daum.maps.CustomOverlay({
      map: this.map,
      position: this.markers[this.markers.length - 1].getPosition(),
      clickable: false,
      xAnchor: 0,
      yAnchor: 1,
      content: `<div style="background-color: white; padding: 3px; border: 1px solid #AAA;">
        <span class="center">도착</span>
      </div>`
    });
  }

  initInfoWindow() {
    this.infoWindow = new daum.maps.InfoWindow({zIndex: 1});
  }

  initSearcher() {
    this.ps = new daum.maps.services.Places();
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
    this.infoWindow.setContent(`<div style="padding:5px;z-index:1;white-space: nowrap;word-wrap: normal;text-overflow: ellipsis;overflow: hidden;">${title}</div>`);
    this.infoWindow.open(this.map, marker);
  }

  createMarker(options = {}) {
    if(!options.latlng) {
      options.latlng = new daum.maps.LatLng(options.latitude, options.longitude);
    }

    if(options.draggable === undefined) {
      options.draggable = this.props.markable;
    }

    return new daum.maps.Marker(Object.assign({
      map: this.map,
      position: options.latlng
    }, options));
  }

  addEventListenerToMarker(marker, index, options) {
    if(this.props.markable) {
      daum.maps.event.addListener(marker, 'dragstart', () => this.currentMarkerIndex = index);
      daum.maps.event.addListener(marker, 'dragend',   () => {
        const {onMoveMarker} = this.props;
        const _latlng = marker.getPosition();
        onMoveMarker && onMoveMarker(index, _latlng.getLat(), _latlng.getLng());
      });

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
    }

    daum.maps.event.addListener(marker, 'click', () => {
      const {onClickMarker, places} = this.props;
      onClickMarker && onClickMarker(null, places[index]);
    });

    daum.maps.event.addListener(marker, 'mouseover', () =>
      this.displayInfoWindow(marker, options.name)
    );

    daum.maps.event.addListener(marker, 'mouseout', () =>
      this.infoWindow.close()
    );
  }

  addPlaceMarker(position, options = {}) {
    const {markable, onCreateMarker} = this.props;

    const marker = this.createMarker(
      Object.assign({}, position, {
        image: !markable && new daum.maps.MarkerImage(
          'public/images/red-circle.png',
          new daum.maps.Size(10, 10), {
            offset: new daum.maps.Point(5, 5)
          }
        )
      })
    );

    this.markers.push(marker);
    const index = this.markers.length - 1
    this.currentMarkerIndex = index;

    this.addEventListenerToMarker(marker, index, options);

    if(!options.noCallback && onCreateMarker) {
      const latlng = marker.getPosition();
      onCreateMarker(
        this.currentMarkerIndex,
        latlng.getLat(),
        latlng.getLng(),
        {name: options.name}
      );
    }
  }

  showSelectedPlaceMarker(position) {
    if(this.selectedMarker) {
      this.selectedMarker.setPosition(position);

    } else {
      this.selectedMarker = this.createMarker({
        position,
        image: new daum.maps.MarkerImage(
          'public/images/selected-red-circle.png',
          new daum.maps.Size(10, 10), {
            offset: new daum.maps.Point(5, 5)
          }
        )
      });
    }
  }

  hideSelectedPlaceMarker() {
    if(this.selectedMarker) {
      this.selectedMarker.setMap(null);
      this.selectedMarker = null;
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

    if(markable) {
      daum.maps.event.addListener(marker, 'rightclick', () =>
        this.addPlaceMarker({latlng: marker.getPosition()}, {name: place.place_name})
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

  removePath() {
    if(this.path) {
      this.path.setMap(null);
      this.path = null;
      this.startPoint.setMap(null);
      this.startPoint = null;
      this.endPoint.setMap(null);
      this.endPoint = null;
    }
  }

  render() {
    const {
      className,
      places,
      initialPlaces,
      selectedPlaceIndex,
      markable,
      searchable,
      hasPath,

      onCreateMarker,
      onMoveMarker,
      onDeleteMarker,
      onClickMarker,
      ...attrs
    } = this.props;

    const {keyword, searchResult, searchPagination} = this.state;

    return (
      <div {...attrs} className={`map ${className || ''}`}>
        <div className='map__map-wrapper'>
          <div ref="mapContainer" className='map__map-container'></div>
          <div>빈 곳에 우클릭: 장소 생성, 장소 우클릭: 장소 삭제</div>
        </div>
        {searchable &&
          <div className='map__search-container'>
            <input
              type='text'
              value={keyword}
              onChange={this.handleChangeKeyword}
              onKeyPress={this.handlePressKeyOnKeywordInput}
              className='map__search-input'
              />
            <button onClick={this.handleSearch} className='map__search-button'>검색</button>
            <div className='map__search-result'>
              <ul>
                {searchResult.map((r,i) =>
                  <li
                    className='map__search-result-item'
                    key={`search-result-${i}`}
                    onMouseOver={() => this.handleMouseOverResult(i, r.place_name)}>
                    <div className='search-result-item__name'>{r.place_name}</div>
                    <div className='search-result-item__address'>{r.road_address_name}</div>
                    <div className='search-result-item__address'>{r.address_name}</div>
                    <div className='search-result-item__phone'>{r.phone}</div>
                  </li>
                )}
              </ul>
              <ul>
                {searchPagination &&
                  [...Array(searchPagination.last).keys()].map(i =>
                    <li className='map__search-pagination-item' key={`search-pagination-${i}`}>
                      <a onClick={() => this.handleChangeSearchResultPage(i+1)} style={{margin: 10}}>
                        {i + 1}
                      </a>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }
}
