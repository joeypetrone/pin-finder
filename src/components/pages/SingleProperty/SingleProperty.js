import React from 'react';
import { Link } from 'react-router-dom';
import { ListGroup } from 'reactstrap';

import propertyData from '../../../helpers/data/propertyData';
import pinData from '../../../helpers/data/pinData';

import MyMap from '../../shared/MyMap/MyMap';
import Pins from '../../shared/Pins/Pins';

import './SingleProperty.scss';

class SingleProperty extends React.Component {
  state = {
    property: {},
    pins: [],
  }

  componentDidMount() {
    const { propertyId } = this.props.match.params;
    propertyData.getSingleProperty(propertyId)
      .then((response) => this.setState({ property: response.data }))
      .catch((err) => console.error('Unable to get single property: ', err));

    pinData.getPinsByPropertyId(propertyId)
      .then((response) => this.setState({ pins: response }))
      .catch((err) => console.error('Unable to get pins in single property view: ', err));
  }

  removeSingleProperty = (e) => {
    e.preventDefault();
    const removePropertyId = this.props.match.params.propertyId;
    propertyData.deleteProperty(removePropertyId)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('Unable to delete property in single view: ', err));
  }

  render() {
    const { property, pins } = this.state;
    const { propertyId } = this.props.match.params;
    const editPropertyLink = `/property/edit/${propertyId}`;
    const addPinLink = `/pin/new/${propertyId}`;

    const buildPinList = pins.map((pin) => (
      <Pins key={pin.id} pin={pin} />
    ));

    return (
      <div className="SingleProperty">
        <h3>{property.name}</h3>
        <h4>{property.address}</h4>
        <div className="card flex-row flex-wrap justify-content-center">
          <div className="card-header border-0">
            <img src={property.imageUrl} className="card-img" alt="" />
          </div>
          <div className="card-block px-2 mt-2">
            <h5 className="card-title">Owner: {property.owner}</h5>
            <p className="card-text">Description: {property.description}</p>
          </div>
          <div className="card-block px-2 mt-2">
            <h6 className="card-title">Property Area: {property.squareFeet} SQ.FT.</h6>
            <p className="card-text">Cordinates: {property.centerLat} {property.centerLng}</p>
            <div className="mb-3">
              <Link className="btn btn-warning m-2" to={editPropertyLink}>Edit</Link>
              <button className="btn btn-danger m-2" onClick={this.removeSingleProperty}>Delete</button>
            </div>
          </div>
        </div>
        <div className="justify-content-center mb-3">
          <MyMap propertyLat={property.centerLat} propertyLng={property.centerLng} />
          <Link className="btn btn-primary mt-3" to={addPinLink}>Add Pin</Link>
          {
            pins[0]
              ? <h5 className="text-left font-weight-bold">Property Pins</h5>
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
