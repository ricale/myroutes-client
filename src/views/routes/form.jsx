import React, {Component} from 'react';

import PlaceMap from 'components/PlaceMap';

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

    this.setState({places});
  }

  handleMoveMarker(index, latitude, longitude) {
    const {places} = this.state;

    if(!places[index]) {
      return;
    }

    places[index].latitude = latitude;
    places[index].longitude = longitude;

    this.setState({places});
  }

  handleDeleteMarker(index) {
    const {places} = this.state;

    if(!places[index]) {
      return;
    }

    places.splice(index, 1);

    this.setState({places});
  }

  handleChangePlaceName(index, name) {
    const {places} = this.state;

    if(!places[index]) {
      return;
    }

    places[index].name = name;

    this.setState({places});
  }

  handleChangePlaceOrder(index, direction) {
    const {places} = this.state;

    const destination = ((i, d) =>
      d === 'up' ? i - 1 : i + 1
    )(index, direction);

    const [spliced] = places.splice(index, 1);

    places.splice(destination, 0, spliced);

    this.setState({places});
  }

  handleSubmit() {
    const {onSubmit} = this.props;
    const {name, places} = this.state;
    const data = {
      name,
      places: places.map((p,i) =>
        Object.assign({order: i}, p)
      )
    };

    onSubmit && onSubmit(data);
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

        <PlaceMap
          places={places}
          initialMarkers={initialPlaces}

          editable={true}
          onChangePlaceName={(i, name) => this.handleChangePlaceName(i, name)}
          onChangePlaceOrder={(i, direction) => this.handleChangePlaceOrder(i, direction)}
          onCreateMarker={this.handleCreateMarker}
          onMoveMarker={this.handleMoveMarker}
          onDeleteMarker={this.handleDeleteMarker}
          />

        <div>
          <button onClick={this.handleSubmit}>저장</button>
        </div>
      </div>
    ) 
  }
}
