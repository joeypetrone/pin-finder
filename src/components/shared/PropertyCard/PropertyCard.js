import React from 'react';

import './PropertyCard.scss';

class PropertyCard extends React.Component {
  render() {
    return (
      <div className="PropertyCard col-sm-12 col-md-3 mb-4">
        <div class="card">
          <img class="card-img-top" src="..." alt="property card" />
          <div class="card-body">
            <h5 class="card-title">Card title</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button href="#" class="btn btn-primary">Go somewhere</button>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyCard;
