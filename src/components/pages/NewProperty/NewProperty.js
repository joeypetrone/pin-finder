import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';

import MyMap from '../../shared/MyMap/MyMap';

import './NewProperty.scss';

class NewProperty extends React.Component {
  currentPosition = (position) => {
    console.log('Latitude: ', position.lat);
    console.log('Longitude: ', position.lng);
  }

  render() {
    return (
      <div className="NewProperty w-100">
        <h3>Add New Property</h3>
        <div className="card flex-row flex-wrap justify-content-center">
          <div className="card-block px-2 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="newPropertyName" className="font-weight-bold mt-2 ml-1">Name: </Label>
                <Input type="text" name="name" id="newPropertyName" placeholder="Burger King" />
                <Label for="newPropertyAddress" className="font-weight-bold mt-2 ml-1">Address: </Label>
                <Input type="text" name="address" id="newPropertyAddress" placeholder="2011 8th Ave S, Nashville, TN 37204" />
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="newPropertyOwner" className="font-weight-bold mt-2 ml-1">Owner: </Label>
                <Input type="text" name="owner" id="newPropertyOwner" placeholder="Restaurant Brands International" />
                <Label for="newPropertyArea" className="font-weight-bold mt-2 ml-1">Property Area: </Label>
                <InputGroup>
                  <Input type="number" name="area" id="newPropertyArea" className="col-8" placeholder="10000" />
                  <InputGroupAddon addonType="append">SQ.FT.</InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-md-4 col-sm-12">
          <Form>
              <FormGroup>
                <Label for="newPropertyImageUrl" className="font-weight-bold mt-2 ml-1">Image Url: </Label>
                <Input type="text" name="imageUrl" id="newPropertyImageUrl" placeholder="https://cdn.usarestaurants.info/assets/uploads/3f4416b643aaf9b8f18c92a1ba473985_-united-states-tennessee-davidson-county-nashville-burger-king-160318htm.jpg" />
                <FormGroup row>
                  <div className="col-md-6 col-sm-6">
                    <Label for="newPropertyLatitude" className="font-weight-bold mt-2 ml-1">Latitude: </Label>
                    <Input type="number" name="latitude" id="newPropertyLatitude" placeholder="36.133425" />
                  </div>
                  <div className="col-md-6 col-sm-6">
                    <Label for="newPropertylongitude" className="font-weight-bold mt-2 ml-1">Longitude: </Label>
                    <Input type="number" name="longitude" id="newPropertylongitude" placeholder="-86.779653" />
                  </div>
                </FormGroup>
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-12">
          <Form>
              <FormGroup>
                <Label for="newPropertyDescription" className="font-weight-bold mt-2 ml-1">Description: </Label>
                <Input type="textarea" name="description" id="newPropertyDescription" placeholder="Well-known fast-food chain serving grilled burgers, fries & shakes, plus breakfast." />
              </FormGroup>
            </Form>
          </div>
        </div>
        <MyMap propertyLat={36.133425} propertyLng={-86.779653} currentPosition={this.currentPosition} />
        <button className="btn btn-primary m-3">Save Property</button>
      </div>
    );
  }
}

export default NewProperty;
