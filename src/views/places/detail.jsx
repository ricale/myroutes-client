import React, {Component} from 'react';
import {connect} from 'react-redux';

import {fetchPlace, updatePlace} from 'actions/places';

class PlaceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleSubmit     = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const {fetchPlace, id} = this.props;
    fetchPlace(id);
  }

  componentWillReceiveProps(newProps) {
    const {id, fetchPlace} = this.props;
    const {id: newId} = newProps;

    if(id !== newId) {
      fetchPlace(newId);
    }
  }

  handleChangeFile(event) {
    // return (event) => {
      console.log('event.target.files', event.target.files)
      this.setState({images: event.target.files});
    // }
  }

  handleSubmit() {
    const {updatePlace, id} = this.props;
    const {images} = this.state;

    const fd = new FormData();
    fd.append('file', this.refs.file.files[0])

    updatePlace(id, fd)
  }

  render() {
    const {place} = this.props;
    return (
      <div>
        <h2>Place Detail</h2>
        <div>{place.name}</div>
        <div>{place.latitude}</div>
        <div>{place.longitude}</div>

        <input ref='file' type='file' name='file' onChange={this.handleChangeFile}/>
        <button onClick={this.handleSubmit}>저장</button>

        {(place.images || []).map(img =>
          <div key={`img-${img.id}`}>
            <img src={`http://localhost:5000${img.url}`} width='100' height='100' />
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.match.params.id,
    place: state.places.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchPlace: (...args) =>
      dispatch(fetchPlace(...args)),

    updatePlace: (...args) =>
      dispatch(updatePlace(...args))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetail);
