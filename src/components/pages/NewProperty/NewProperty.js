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
  state = {
    propertyName: '',
    propertyDescription: '',
    propertyImageUrl: '',
    propertyAddress: '',
    propertyOwner: '',
    propertyArea: '',
    propertyLat: '',
    propertyLng: '',
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ propertyName: e.target.value });
  };

  addressChange = (e) => {
    e.preventDefault();
    this.setState({ propertyAddress: e.target.value });
  }

  ownerChange = (e) => {
    e.preventDefault();
    this.setState({ propertyOwner: e.target.value });
  }

  areaChange = (e) => {
    e.preventDefault();
    this.setState({ propertyArea: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ propertyImageUrl: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ propertyDescription: e.target.value });
  }

  currentPosition = (position) => {
    const propertyLat = position.lat.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
    const propertyLng = position.lng.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
    this.setState({ propertyLat });
    this.setState({ propertyLng });
  }

  render() {
    const {
      propertyName,
      propertyDescription,
      propertyImageUrl,
      propertyAddress,
      propertyOwner,
      propertyArea,
      propertyLat,
      propertyLng,
    } = this.state;

    return (
      <div className="NewProperty w-100">
        <h3>Add New Property</h3>
        <div className="card flex-row flex-wrap justify-content-center">
          <div className="card-block px-2 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="new-property-name" className="font-weight-bold mt-2 ml-1">Name: </Label>
                <Input
                  type="text"
                  name="name"
                  id="new-property-name"
                  placeholder="Burger King"
                  value={propertyName}
                  onChange={this.nameChange}
                />
                <Label for="newPropertyAddress" className="font-weight-bold mt-2 ml-1">Address: </Label>
                <Input
                  type="text"
                  name="address"
                  id="new-property-address"
                  placeholder="2011 8th Ave S, Nashville, TN 37204"
                  value={propertyAddress}
                  onChange={this.addressChange}
                />
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="newPropertyOwner" className="font-weight-bold mt-2 ml-1">Owner: </Label>
                <Input
                  type="text"
                  name="owner"
                  id="new-property-owner"
                  placeholder="Restaurant Brands International"
                  value={propertyOwner}
                  onChange={this.ownerChange}
                />
                <Label for="newPropertyArea" className="font-weight-bold mt-2 ml-1">Property Area: </Label>
                <InputGroup>
                  <Input
                    type="number"
                    name="area"
                    id="new-property-area"
                    className="col-6"
                    placeholder="10000"
                    value={propertyArea}
                    onChange={this.areaChange}
                  />
                  <InputGroupAddon addonType="append">SQ.FT.</InputGroupAddon>
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-md-4 col-sm-12">
          <Form>
              <FormGroup>
                <Label for="newPropertyImageUrl" className="font-weight-bold mt-2 ml-1">Image Url: </Label>
                <Input
                  type="text"
                  name="imageUrl"
                  id="new-property-image-url"
                  placeholder="https://cdn.usarestaurants.info/assets/uploads/3f4416b643aaf9b8f18c92a1ba473985_-united-states-tennessee-davidson-county-nashville-burger-king-160318htm.jpg"
                  value={propertyImageUrl}
                  onChange={this.imageUrlChange}
                  />
                <FormGroup row className="mt-2">
                  <div className="col-md-6 col-sm-3 w-50">
                    <Label for="newPropertyLatitude" className="font-weight-bold ml-1">Latitude: </Label>
                    <Input
                      type="number"
                      name="latitude"
                      id="new-property-latitude"
                      placeholder="36.133425"
                      value={propertyLat}
                      disabled
                    />
                  </div>
                  <div className="col-md-6 col-sm-3 w-50">
                    <Label for="newPropertylongitude" className="font-weight-bold ml-1">Longitude: </Label>
                    <Input
                      type="number"
                      name="longitude"
                      id="new-property-longitude"
                      placeholder="-86.779653"
                      value={propertyLng}
                      disabled
                    />
                  </div>
                </FormGroup>
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-12">
          <Form>
              <FormGroup>
                <Label for="newPropertyDescription" className="font-weight-bold mt-2 ml-1">Description: </Label>
                <Input
                  type="textarea"
                  name="description"
                  id="new-property-description"
                  placeholder="Well-known fast-food chain serving grilled burgers, fries & shakes, plus breakfast."
                  value={propertyDescription}
                  onChange={this.descriptionChange}
                  />
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
