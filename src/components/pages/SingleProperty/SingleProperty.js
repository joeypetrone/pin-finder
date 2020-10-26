import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';

import propertyData from '../../../helpers/data/propertyData';
import pinData from '../../../helpers/data/pinData';

import MyMap from '../../shared/MyMap/MyMap';
import Pins from '../../shared/Pins/Pins';
import Modal from '../../shared/Modal/Modal';

import './SingleProperty.scss';

class SingleProperty extends React.Component {
  state = {
    property: {},
    pins: [],
    loadMap: false,
    show: false,
  }

  getPins = () => {
    const { propertyId } = this.props.match.params;
    pinData.getPinsByPropertyId(propertyId)
      .then((response) => this.setState({ pins: response }))
      .catch((err) => console.error('Unable to get pins in single property view: ', err));
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { propertyId } = this.props.match.params;

    propertyData.getSingleProperty(propertyId)
      .then((response) => this.setState({ property: response.data, loadMap: true }))
      .catch((err) => console.error('Unable to get single property: ', err));

    this.getPins();
  }

  removeSingleProperty = (e) => {
    e.preventDefault();
    const { pins } = this.state;
    const removePropertyId = this.props.match.params.propertyId;
    propertyData.deleteProperty(removePropertyId)
      .then(() => {
        if (pins) {
          pins.forEach((pin) => {
            pinData.deletePin(pin.id)
              .then(() => this.props.history.push('/home'))
              .catch((err) => console.error('Unable to delete pin in single property view'));
          });
        }
        this.props.history.push('/home');
      })
      .catch((err) => console.error('Unable to delete property in single view: ', err));
  }

  removePin = (pinId) => {
    pinData.deletePin(pinId)
      .then(() => {
        this.getPins();
      })
      .catch((err) => console.error('unable to delete property: ', err));
  }

  viewImage = () => {
    window.scrollTo(0, 0);
    this.setState({ show: !this.state.show });
  }

  render() {
    const { property, pins, loadMap } = this.state;
    const { propertyId } = this.props.match.params;
    const editPropertyLink = `/property/edit/${propertyId}`;
    const addPinLink = `/pin/new/${propertyId}`;
    const returnToHomeLink = '/home';
    const imgAltTag = `${property.name} photo`;
    let propertyCardHeader = '';

    const buildPinList = pins.map((pin) => (
      <Pins key={pin.id} pin={pin} removePin={this.removePin}/>
    ));

    (property.imageUrl)
      ? propertyCardHeader = <div className="card-header border-0">
          <img src={property.imageUrl} className="card-img" alt={imgAltTag} onClick={this.viewImage}/>
          <div>
            <button className="btn btn-dark btn-sm btn-responsive" onClick={this.viewImage}><i className="fas fa-search-plus"></i></button>
          </div>
        </div>
      : propertyCardHeader = '';

    return (
      <div className="SingleProperty w-100">
        <h3>{property.name}</h3>
        <h4>{property.address}</h4>
        <div className="card flex-row flex-wrap justify-content-center">
          {propertyCardHeader}
          <div className="card-block px-2 mt-2">
            <h5 className="card-title"><span className="font-weight-bold mr-1">Owner: </span>{property.owner}</h5>
            <p className="card-text"><span className="font-weight-bold mr-1">Description: </span>{property.description}</p>
          </div>
          <div className="card-block px-2 mt-2">
            <h6 className="card-title"><span className="font-weight-bold mr-1">Property Area: </span>{property.squareFeet} SQ.FT.</h6>
            <p className="card-text p-1 px-2 border rounded bg-light"><span className="font-weight-bold mr-1">Cordinates: </span>{property.centerLat} {property.centerLng}</p>
            <div className="mb-3">
              <Link className="btn btn-primary m-2" to={returnToHomeLink}><i className="fas fa-arrow-circle-left"></i> Back</Link>
              <Link className="btn btn-warning m-2" to={editPropertyLink}>Edit</Link>
              <button className="btn btn-danger m-2" onClick={this.removeSingleProperty}>Delete</button>
            </div>
          </div>
        </div>
        <Modal viewImage={this.viewImage} show={this.state.show}>
            <img src={property.imageUrl} className="modal-img" alt={imgAltTag} />
        </Modal>
        <div className="justify-content-center mb-3">
          {
            loadMap
              ? <MyMap propertyLat={property.centerLat} propertyLng={property.centerLng} />
              : <div className="text-center">Map loading...</div>
          }
          <Link className="btn btn-primary mt-3" to={addPinLink}>Add Pin</Link>
          {
            pins[0]
              ? <h5 className="text-left font-weight-bold ml-1">Property Pins</h5>
              : ''
          }
          <ListGroup>
            {buildPinList}
          </ListGroup>
        </div>
      </div>
    );
  }
}

export default SingleProperty;
