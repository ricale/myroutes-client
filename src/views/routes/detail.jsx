import React, {Component} from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {fetchRoute, deleteRoute} from 'actions/routes';
import {fetchPlace} from 'actions/places';
import {showSlider, hideSlider} from 'actions/slider';

import PlaceMap from 'components/PlaceMap';
import IconButton from 'components/IconButton';
import ImageSlider from 'components/ImageSlider';
import pathHelper from 'utils/pathHelper';

import './detail.less';

class RouteDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleClickDelete = this.handleClickDelete.bind(this);
    this.handleClickPlaceImage = this.handleClickPlaceImage.bind(this);
  }

  componentDidMount() {
    console.log('RouteDetail componentDidMount');
    const {fetchRoute, id} = this.props;
    fetchRoute(id);
  }

  componentWillReceiveProps(newProps) {
    const {route, id, fetchRoute} = this.props;
    const {
      route: newRoute,
      id: newId
    } = newProps;

    if(id !== newId) {
      fetchRoute(newId);

    } else if(route.id !== newRoute.id) {
      this.setState({places: newRoute.places || []});
    }
  }

  handleClickDelete(event) {
    event.preventDefault();
    const {deleteRoute, goToList, id} = this.props;
    deleteRoute(id).then(() =>
      goToList()
    );
  }

  handleClickPlaceImage(placeImage) {
    this.props.showSlider(placeImage.id);
  }

  getPlaceImages() {
    return this.props.route.places.map(p =>
      p.images
    ).reduce((result, current) =>
      result.concat(current)
    , []);
  }

  render() {
    const {route, place, slider, showSlider, hideSlider} = this.props;

    if(!route || !route.id) {
      return <div></div>
    }

    return (
      <div className='route-detail'>
        <div className='route-detail__header'>
          <h2 className='route-detail__name'>{route.name}</h2>
          <ul className='route-detail__menu'>
            <li>
              <IconButton to={pathHelper.routes.edit(route.id)} iconName='edit'/>
            </li>
            <li>
              <IconButton onClick={this.handleClickDelete} iconName='remove' />
            </li>
          </ul>
        </div>

        <div className='route-detail__content'>
          <PlaceMap
            places={route.places}
            markers={route.places}
            markable={false}
            editable={false}
            searchable={false}
            hasPath={true}

            onClickPlaceImage={this.handleClickPlaceImage}
            />
        </div>

        <ImageSlider
          images={this.getPlaceImages()}
          show={slider.show}
          current={slider.current}

          onClickClose={() => hideSlider()}
          onClickNext={(id) => showSlider(id)}
          onClickPrev={(id) => showSlider(id)}
          />
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.match.params.id,
    route: state.routes.current,
    place: state.places.current,
    slider: state.slider,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchRoute: (...args) => dispatch(fetchRoute(...args)),
    deleteRoute: (...args) => dispatch(deleteRoute(...args)),
    fetchPlace: (...args) => dispatch(fetchPlace(...args)),

    showSlider: (...args) => dispatch(showSlider(...args)),
    hideSlider: (...args) => dispatch(hideSlider(...args)),

    goToList: () =>
      dispatch(push(pathHelper.routes.list())),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteDetail);
