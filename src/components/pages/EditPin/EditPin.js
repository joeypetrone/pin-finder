import React from 'react';
import {
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import authData from '../../../helpers/data/authData';
import propertyData from '../../../helpers/data/propertyData';
import pinData from '../../../helpers/data/pinData';

import MyMap from '../../shared/MyMap/MyMap';

import './EditPin.scss';

class EditPin extends React.Component {
  state = {
    pinTypes: [],
    property: {},
    loadMap: false,
    pinName: '',
    pinPropertyId: '',
    pinImageUrl: '',
    pinNotes: '',
    pinLat: 0,
    pinLng: 0,
    wasFound: true,
    pinTypeId: '',
  }

  markerPosition = (position) => {
    const pinLat = position.lat.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1;
    const pinLng = position.lng.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0] * 1;
    this.setState({ pinLat });
    this.setState({ pinLng });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const { pinId } = this.props.match.params;

    pinData.getSinglePin(pinId)
      .then((response) => {
        const pin = response.data;

        propertyData.getSingleProperty(pin.propertyId)
          .then((property) => {
            pinData.getAllPinTypes()
              .then((pinTypes) => this.setState({
                property: property.data,
                loadMap: true,
                pinPropertyId: pin.propertyId,
                pinTypes,
                pinName: pin.name,
                pinImageUrl: pin.imageUrl,
                pinNotes: pin.notes,
                pinLat: pin.locationLat,
                pinLng: pin.locationLng,
                wasFound: pin.wasFound,
                pinTypeId: pin.typeId,
              }))
              .catch((err) => console.error('Unable to get all pin types on edit pin page: ', err));
          })
          .catch((err) => console.error('Unable to get pin on edit pin page: ', err));
      })
      .catch((err) => console.error('Unable to get property on edit pin page: ', err));
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ pinName: e.target.value });
  };

  notesChange = (e) => {
    e.preventDefault();
    this.setState({ pinNotes: e.target.value });
  };

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  };

  typeChange = (e) => {
    const pinTypeId = e.target.value;
    this.setState({ pinTypeId });
    if (pinTypeId === 'pinType19') {
      this.setState({ wasFound: false });
    }
  }

  updatePin = (e) => {
    e.preventDefault();
    const { pinId } = this.props.match.params;

    const {
      pinName,
      pinPropertyId,
      pinImageUrl,
      pinNotes,
      pinLat,
      pinLng,
      wasFound,
      pinTypeId,
    } = this.state;

    const updatedPin = {
      name: pinName,
      propertyId: pinPropertyId,
      imageUrl: pinImageUrl,
      notes: pinNotes,
      wasFound,
      typeId: pinTypeId,
      locationLat: pinLat,
      locationLng: pinLng,
      uid: authData.getUid(),
    };

    pinData.putPin(pinId, updatedPin)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('Unable to post new property: ', err));
  }

  render() {
    const {
      pinTypes,
      property,
      loadMap,
      pinName,
      pinImageUrl,
      pinNotes,
      pinLat,
      pinLng,
      pinTypeId,
    } = this.state;

    return (
      <div className="EditPin">
        <h3>{property.name}</h3>
        <h4>{property.address}</h4>
        <h3>Edit Pin</h3>
        <div className="card flex-row flex-wrap justify-content-center">
          <div className="card-block px-2 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="edit-pin-name" className="font-weight-bold mt-2 ml-1">Name: </Label>
                <Input
                  type="text"
                  name="name"
                  id="edit-pin-name"
                  value={pinName}
                  onChange={this.nameChange}
                />
                <Label for="edit-pin-type" className="font-weight-bold mt-2 ml-1">Pin Type: </Label>
                <select className="custom-select" id="edit-pin-type" onChange={this.typeChange} value={pinTypeId}>
                  <option value='0'>Select Type</option>
                  {
                    pinTypes.map((pinType) => <option key={pinType.id} className="dropdown-item" id={pinType.id} value={pinType.id}>{pinType.title}</option>)
                  }
                </select>
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="edit-pin-notes" className="font-weight-bold mt-2 ml-1">Notes: </Label>
                  <Input
                    type="textarea"
                    rows="4"
                    name="notes"
                    id="edit-pin-notes"
                    value={pinNotes}
                    onChange={this.notesChange}
                  />
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-md-4 col-sm-12">
          <Form>
              <FormGroup>
                <Label for="edit-pin-image-url" className="font-weight-bold mt-2 ml-1">Image Url: </Label>
                  <Input
                    type="text"
                    name="imageUrl"
                    id="edit-pin-image-url"
                    value={pinImageUrl}
                    onChange={this.imageUrlChange}
                  />
                <FormGroup row className="mt-2">
                  <div className="col-md-6 col-sm-3 w-50">
                    <Label for="edit-pin-latitude" className="font-weight-bold ml-1">Latitude: </Label>
                    <Input
                      type="number"
                      name="latitude"
                      id="edit-pin-latitude"
                      value={pinLat}
                      disabled
                    />
                  </div>
                  <div className="col-md-6 col-sm-3 w-50">
                    <Label for="edit-pin-longitude" className="font-weight-bold ml-1">Longitude: </Label>
                    <Input
                      type="number"
                      name="longitude"
                      id="edit-pin-longitude"
                      value={pinLng}
                      disabled
                    />
                  </div>
                </FormGroup>
              </FormGroup>
            </Form>
          </div>
        </div>
        {
          loadMap
            ? <MyMap propertyLat={property.centerLat} propertyLng={property.centerLng} pinLat={pinLat} pinLng={pinLng} pin={true} markerPosition={this.markerPosition}/>
            : <div className="text-center">Map loading...</div>
        }
        <button className="btn btn-primary m-3" onClick={this.updatePin}>Update Pin</button>
      </div>
    );
  }
}

export default EditPin;
