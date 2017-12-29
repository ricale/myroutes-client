import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import numeral from 'numeral';

import Icon from 'components/Icon';
import IconButton from 'components/IconButton';
import PlaceImage from 'components/PlaceImage';
import pathHelper from 'utils/pathHelper';
import {API_HOST} from 'utils/constants';

import './PlaceList.less'

class Place extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleClickUp = this.handleClickUp.bind(this);
    this.handleClickDown = this.handleClickDown.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleClick(event) {
    const {onClick, place} = this.props;
    onClick(event, place);
  }

  handleClickUp(event) {
    const {onChangeOrder, index} = this.props;
    onChangeOrder(index, 'up');
  }

  handleClickDown(event) {
    const {onChangeOrder, index} = this.props;
    onChangeOrder(index, 'down');
  }

  handleChangeName(event) {
    const {onChangeName, index} = this.props;
    onChangeName(index, event.target.value);
  }

  handleRemove(event) {
    event.preventDefault();
    const {onRemove, index} = this.props;
    onRemove(index);
  }

  render() {
    const {place, editable, index, active, onChangeName} = this.props;

    return (
      <div className={`${active ? 'active' : ''} place-list__place`} onClick={this.handleClick}>
        <div className='place-list__place-info' onClick={this.handleClick}>
          {!editable && !isNaN(place.odr) &&
            <div className='place-list__place-index'>{place.odr + 1}</div>
          }
          <div className='place-list__place-name'>
            {editable && <input onChange={this.handleChangeName} value={place.name} />}
            {!editable && place.name}
          </div>
          <div className='place-list__place-address'>{place.address}</div>
          <div className='place-list__place-position'>{`${numeral(place.latitude).format('0.000')},${numeral(place.longitude).format('0.000')}`}</div>
          {!editable &&
            <IconButton to={pathHelper.places.detail(place.route_id, place.id)} iconName='edit'/>
          }
          {editable &&
            <IconButton onClick={this.handleRemove} iconName='remove'/>
          }
          {editable &&
            <span className='place-list__place-button up' onClick={this.handleClickUp}>
              <Icon name='arrow-up white' />
            </span>
          }
          {editable &&
            <span className='place-list__place-button down' onClick={this.handleClickDown}>
              <Icon name='arrow-down white' />
            </span>
          }
        </div>
        {(place.images || []).map(img =>
          <PlaceImage
            width={128}
            src={`${API_HOST}${img.thumbnail2url}`}
            originalSrc={`${API_HOST}${img.url}`}
            key={`img-${img.id}`}
            />
        )}
      </div>
    )
  }
};

export default class PlaceList extends Component {
  constructor(props) {
    super(props);
    this.handleClickItem = this.handleClickItem.bind(this);
  }

  handleClickItem(event, place) {
    const {onClickItem} = this.props;
    onClickItem && onClickItem(event, place);
  }

  isActive(id) {
    const {activePlaceId} = this.props;
    return activePlaceId !== undefined && activePlaceId === id;
  }

  getIndex(h, i) {
    return ;
  }

  render() {
    const {
      places,
      activePlaceId,
      editable,
      onClickItem,
      onChangePlaceName,
      onChangePlaceOrder,
      onRemovePlace,
      className,
      ...attrs
    } = this.props;

    const placeCountInARow = 7;
    const placeCount = (places || []).length;
    const rowCount = placeCount % placeCountInARow === 0 ?
      (placeCount / placeCountInARow) :
      (parseInt(placeCount / placeCountInARow, 10) + 1);

    const placeRows = [...Array(rowCount).keys()].map(i =>
      (places || []).slice(i * placeCountInARow, (i + 1) * placeCountInARow)
    );

    return (
      <div {...attrs} className={`place-list ${className || ''}`}>
        {placeRows.map((r,h) =>
          <div className='place-list__row' key={`place-list__row-${h}`}>
            {r.map((p,i) =>
              <Place
                key={`place-${i}`}
                place={p}
                index={h*placeCountInARow + i}
                active={this.isActive(p.id)}
                onClick={this.handleClickItem}
                onChangeName={onChangePlaceName}
                onChangeOrder={onChangePlaceOrder}
                onRemove={onRemovePlace}
                editable={editable}
                />
            )}
          </div>
        )}
      </div>
    )
  }
}
