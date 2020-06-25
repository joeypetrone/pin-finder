import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import propertyShape from '../../../helpers/propz/propertyShape';

import './PropertyCard.scss';

class PropertyCard extends React.Component {
  static propTypes = {
    property: propertyShape.propertyShape,
    removeProperty: PropTypes.func.isRequired,
  }

  deletePropertyEvent = (e) => {
    e.preventDefault();
    const { property, removeProperty } = this.props;
    const propertyId = property.id;
    removeProperty(propertyId);
  }

  render() {
    const { property } = this.props;
    const singlePropertyLink = `/property/${property.id}`;
    const editPropertyLink = `/property/edit/${property.id}`;

    return (
      <div className="PropertyCard col-sm-12 col-md-3 mb-4">
        <div className="card">
          <img className="card-img-top" src={property.imageUrl} alt="property card" />
          <div className="card-body">
            <h5 className="card-title">{property.name}</h5>
            <p className="card-text">{property.description}</p>
            <Link className="btn btn-primary m-1" to={singlePropertyLink}>View</Link>
            <Link className="btn btn-warning m-1" to={editPropertyLink}>Edit</Link>
            <button className="btn btn-danger m-1" onClick={this.deletePropertyEvent}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyCard;
