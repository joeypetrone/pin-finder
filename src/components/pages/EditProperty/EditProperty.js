import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  InputGroup,
  InputGroupAddon,
  Input,
} from 'reactstrap';

import authData from '../../../helpers/data/authData';
import propertyData from '../../../helpers/data/propertyData';

import MyMap from '../../shared/MyMap/MyMap';

import './EditProperty.scss';

class EditProperty extends React.Component {
  state = {
    property: {},
    loadMap: false,
    propertyName: '',
    propertyDescription: '',
    propertyImageUrl: '',
    propertyAddress: '',
    propertyOwner: '',
    propertyArea: '',
    propertyLat: '',
    propertyLng: '',
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { propertyId } = this.props.match.params;
    propertyData.getSingleProperty(propertyId)
      .then((response) => {
        const property = response.data;
        this.setState({
          property,
          loadMap: true,
          propertyName: property.name,
          propertyDescription: property.description,
          propertyImageUrl: property.imageUrl,
          propertyAddress: property.address,
          propertyOwner: property.owner,
          propertyArea: property.squareFeet,
          propertyLat: property.centerLat,
          propertyLng: property.centerLng,
        });
      })
      .catch((err) => console.error('Unable to get property on edit property page: ', err));
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
    const numberValue = e.target.value * 1;
    this.setState({ propertyArea: numberValue });
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
    const propertyLat = position.lat.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1;
    const propertyLng = position.lng.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1;
    this.setState({ propertyLat });
    this.setState({ propertyLng });
  }

  updateProperty = (e) => {
    const { propertyId } = this.props.match.params;

    e.preventDefault();
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

    const updatedProperty = {
      name: propertyName,
      description: propertyDescription,
      imageUrl: propertyImageUrl,
      address: propertyAddress,
      owner: propertyOwner,
      squareFeet: propertyArea,
      centerLat: propertyLat,
      centerLng: propertyLng,
      uid: authData.getUid(),
    };

    propertyData.putProperty(propertyId, updatedProperty)
      .then(() => this.props.history.push(`/property/${propertyId}`))
      .catch((err) => console.error('Unable to put updated property: ', err));
  }

  render() {
    const {
      property,
      loadMap,
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
      <div className="EditProperty w-100">
        <h3>{property.name}</h3>
        <h4>{property.address}</h4>
        <h3>Edit Property</h3>
        <div className="card flex-row flex-wrap justify-content-center">
          <div className="card-block px-2 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="update-property-name" className="font-weight-bold mt-2 ml-1">Name: </Label>
                <Input
                  type="text"
                  name="name"
                  id="update-property-name"
                  value={propertyName}
                  onChange={this.nameChange}
                />
                <Label for="update-property-address" className="font-weight-bold mt-2 ml-1">Address: </Label>
                <Input
                  type="text"
                  name="address"
                  id="update-property-address"
                  value={propertyAddress}
                  onChange={this.addressChange}
                />
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="update-property-owner" className="font-weight-bold mt-2 ml-1">Owner: </Label>
                <Input
                  type="text"
                  name="owner"
                  id="update-property-owner"
                  value={propertyOwner}
                  onChange={this.ownerChange}
                />
                <Label for="update-property-area" className="font-weight-bold mt-2 ml-1">Property Area: </Label>
                <InputGroup>
                  <Input
                    type="number"
                    name="area"
                    id="update-property-area"
                    className="col-6"
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
                <Label for="update-property-image-url" className="font-weight-bold mt-2 ml-1">Image Url: </Label>
                <Input
                  type="text"
                  name="imageUrl"
                  id="update-property-image-url"
                  value={propertyImageUrl}
                  onChange={this.imageUrlChange}
                  />
                <FormGroup row className="mt-2">
                  <div className="col-md-6 col-sm-3 w-50">
                    <Label for="update-property-latitude" className="font-weight-bold ml-1">Latitude: </Label>
                    <Input
                      type="number"
                      name="latitude"
                      id="update-property-latitude"
                      value={propertyLat}
                      disabled
                    />
                  </div>
                  <div className="col-md-6 col-sm-3 w-50">
                    <Label for="update-property-longitude" className="font-weight-bold ml-1">Longitude: </Label>
                    <Input
                      type="number"
                      name="longitude"
                      id="update-property-longitude"
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
                <Label for="update-property-description" className="font-weight-bold mt-2 ml-1">Description: </Label>
                <Input
                  type="textarea"
                  name="description"
                  id="update-property-description"
                  value={propertyDescription}
                  onChange={this.descriptionChange}
                  />
              </FormGroup>
            </Form>
          </div>
        </div>
        {
          loadMap
            ? <MyMap propertyLat={property.centerLat} propertyLng={property.centerLng} currentPosition={this.currentPosition}/>
            : <div className="text-center">Map loading...</div>
        }
        <button className="btn btn-primary m-3" onClick={this.updateProperty}>Update Property</button>
      </div>
    );
  }
}

export default EditProperty;
