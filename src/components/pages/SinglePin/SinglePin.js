import React from 'react';
import { Link } from 'react-router-dom';

import pinData from '../../../helpers/data/pinData';

import MyMap from '../../shared/MyMap/MyMap';

import './SinglePin.scss';
import propertyData from '../../../helpers/data/propertyData';

class SinglePin extends React.Component {
  state = {
    property: {},
    pin: {},
    loadMap: false,
    pinType: '',
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { pinId } = this.props.match.params;
    pinData.getSinglePin(pinId)
      .then((response) => {
        const pin = response.data;
        propertyData.getSingleProperty(pin.propertyId)
          .then((property) => {
            pinData.getPinType(pin.typeId)
              .then((pinType) => {
                this.setState({
                  property: property.data,
                  pin,
                  loadMap: true,
                  pinType: pinType.data.title,
                });
              })
              .catch((err) => console.error('Unable to get pin type in pin single view: ', err));
          })
          .catch((err) => console.error('Unable to get single property for single pin: ', err));
      })
      .catch((err) => console.error('Unable to get single pin: ', err));
  }

  removeSinglePin = (e) => {
    e.preventDefault();
    const { pin } = this.state;
    const goToPropertyId = pin.propertyId;
    const removePinId = this.props.match.params.pinId;
    pinData.deletePin(removePinId)
      .then(() => this.props.history.push(`/property/${goToPropertyId}`))
      .catch((err) => console.error('Unable to delete pin in pin single view: ', err));
  }

  render() {
    const {
      property,
      pin,
      loadMap,
      pinType,
    } = this.state;

    const { pinId } = this.props.match.params;
    const editPinLink = `/pin/edit/${pinId}`;
    const returnToPropertyLink = `/property/${pin.propertyId}`;
    let cardClassName = 'card-title';

    (pin.wasFound)
      ? cardClassName = 'card-title rounded p-1 text-light bg-success'
      : cardClassName = 'card-title rounded p-1 text-light bg-danger';

    return (
      <div className="SinglePin w-100">
        <h3>{property.name}</h3>
        <h4>{property.address}</h4>
        <div className='card flex-row flex-wrap justify-content-center'>
          <div className="card-header border-0">
            <img src={pin.imageUrl} className="card-img" alt="" />
          </div>
          <div className="card-block px-2 mt-2">
            <h5 className="card-title">Pin: {pin.name}</h5>
            <p className="card-text">Notes: {pin.notes}</p>
            <p className="card-text">Pin Type: {pinType}</p>
          </div>
          <div className="card-block px-2 mt-2">
            <h6 className={cardClassName}>{pin.wasFound ? 'Pin was found' : 'Pin was not found'}</h6>
            <p className="card-text">Coordinates: {pin.locationLat} {pin.locationLng}</p>
            <div className="mb-3">
              <Link className="btn btn-primary m-2" to={returnToPropertyLink}><i className="fas fa-arrow-circle-left"></i> Back</Link>
              <Link className="btn btn-warning m-2" to={editPinLink}>Edit</Link>
              <button className="btn btn-danger m-2" onClick={this.removeSinglePin}>Delete</button>
            </div>
          </div>
        </div>
        <div className="justify-content-center mb-3">
          {
            loadMap
              ? <MyMap propertyLat={pin.locationLat} propertyLng={pin.locationLng} pinLat={pin.locationLat} pinLng={pin.locationLng} pinName={pin.name}/>
              : <div className="text-center">Map loading...</div>
          }
        </div>
      </div>
    );
  }
}

export default SinglePin;
