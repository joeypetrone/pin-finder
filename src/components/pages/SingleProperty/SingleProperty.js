import React from 'react';
import { Link } from 'react-router-dom';

import propertyData from '../../../helpers/data/propertyData';

import './SingleProperty.scss';

class SingleProperty extends React.Component {
  state = {
    property: {},
  }

  componentDidMount() {
    const { propertyId } = this.props.match.params;
    propertyData.getSingleProperty(propertyId)
      .then((response) => this.setState({ property: response.data }))
      .catch((err) => console.error('Unable to get single property: ', err));
  }

  removeSingleProperty = (e) => {
    e.preventDefault();
    const removePropertyId = this.props.match.params.propertyId;
    propertyData.deleteProperty(removePropertyId)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('Unable to delete property in single view: ', err));
  }

  render() {
    const { property } = this.state;
    const { propertyId } = this.props.match.params;
    const editPropertyLink = `/property/edit/${propertyId}`;
    const addPinLink = `/pin/new/${propertyId}`;

    return (
      <div className="SingleProperty">
        <h3>{property.name}</h3>
        <h4>{property.address}</h4>
        <Link className="btn btn-primary" to={addPinLink}>Add Pin</Link>
        <div className="justify-content-center">
          <div className="row card mb-3">
            <img src={property.imageUrl} className="card-img-top p-4 border" alt={property.name} />
            <p className="card-text m-3">{property.description}</p>
            <div className="mb-3">
              <Link className="btn btn-warning m-2" to={editPropertyLink}>Edit</Link>
              <button className="btn btn-danger m-2" onClick={this.removeSingleProperty}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleProperty;
