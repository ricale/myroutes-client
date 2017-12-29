import React, {Component} from 'react';

import PlaceMap from 'components/PlaceMap';
import IconButton from 'components/IconButton';

export default class RouteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: (props.route || {}).name || '',
      places: props.initialPlaces || []
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleCreateMarker = this.handleCreateMarker.bind(this);
    this.handleMoveMarker = this.handleMoveMarker.bind(this);
    this.handleDeleteMarker = this.handleDeleteMarker.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChangeName(event) {
    const name = event.target.value;
    this.setState({name}, () => {
      const {onChangeName} = this.props;
      onChangeName && onChangeName(name);
    });
  }

  handleCreateMarker(index, latitude, longitude, options = {}) {
    const {places} = this.state;
    const name = options.name || `place-${index}`;

    places[index] = {
      name,
      latitude,
      longitude
    };

    this.updatePlaces(places);
  }

  handleMoveMarker(index, latitude, longitude) {
    const {places} = this.state;

    if(!places[index]) {
      return;
    }

    places[index].latitude = latitude;
    places[index].longitude = longitude;

    this.updatePlaces(places);
  }

  handleDeleteMarker(index) {
    const {places} = this.state;

    if(!places[index]) {
      return;
    }

    places.splice(index, 1);

    this.updatePlaces(places);
  }

  handleChangePlaceName(index, name) {
    const {places} = this.state;

    if(!places[index]) {
      return;
    }

    places[index].name = name;

    this.updatePlaces(places);
  }

  handleChangePlaceOrder(index, direction) {
    const {places} = this.state;

    const destination = ((i, d) =>
      d === 'up' ? i - 1 : i + 1
    )(index, direction);

    const [spliced] = places.splice(index, 1);

    places.splice(destination, 0, spliced);

    this.updatePlaces(places);
  }

  handleRemovePlace(index) {
    const {places} = this.state;
    places.splice(index, 1);
    this.updatePlaces(places);
  }

  handleSubmit() {
    const {onSubmit} = this.props;
    const {name, places} = this.state;
    const data = {
      name,
      places: places.map((p,i) =>
        Object.assign({}, p, {odr: i})
      )
    };

    onSubmit && onSubmit(data);
  }

  updatePlaces(places) {
    this.setState({places: places.slice()})
  }

  render() {
    const {initialPlaces} = this.props;
    const {name, places} = this.state;

    return (
      <div>
        <div>
          <label>이름</label>
          <input
            name='name'
            type='text'
            value={name}
            onChange={this.handleChangeName}
            />
        </div>

        <div>
          <IconButton onClick={this.handleSubmit} iconName='save' />
        </div>

        <PlaceMap
          places={places}
          initialMarkers={initialPlaces}
          editable={true}
          onChangePlaceName={(i, name) => this.handleChangePlaceName(i, name)}
          onChangePlaceOrder={(i, direction) => this.handleChangePlaceOrder(i, direction)}
          onRemovePlace={(i) => this.handleRemovePlace(i)}
          onCreateMarker={this.handleCreateMarker}
          onMoveMarker={this.handleMoveMarker}
          onDeleteMarker={this.handleDeleteMarker}
          />
      </div>
    ) 
  }
}
