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

import './NewPin.scss';

class NewPin extends React.Component {
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
    const { propertyId } = this.props.match.params;
    propertyData.getSingleProperty(propertyId)
      .then((response) => {
        pinData.getAllPinTypes()
          .then((pinTypes) => this.setState({
            property: response.data,
            loadMap: true,
            pinPropertyId: propertyId,
            pinTypes,
          }))
          .catch();
      })
      .catch((err) => console.error('Unable to get property on new pin page: ', err));
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

  savePin = (e) => {
    e.preventDefault();
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

    const newPin = {
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

    pinData.postPin(newPin)
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
    } = this.state;

    return (
      <div className="NewPin">
        <h3>{property.name}</h3>
        <h4>{property.address}</h4>
        <h3>Add New Pin</h3>
        <div className="card flex-row flex-wrap justify-content-center">
          <div className="card-block px-2 text-left col-md-4 col-sm-12">
            <Form>
              <FormGroup>
                <Label for="new-pin-name" className="font-weight-bold mt-2 ml-1">Name: </Label>
                <Input
                  type="text"
                  name="name"
                  id="new-pin-name"
                  placeholder="8th Avenue South and Tiger Mart"
                  value={pinName}
                  onChange={this.nameChange}
                />
                <Label for="new-pin-type" className="font-weight-bold mt-2 ml-1">Pin Type: </Label>
                <select className="custom-select" id="new-pin-type" onChange={this.typeChange}>
                  <option selected>Select Type</option>
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
                <Label for="new-pin-notes" className="font-weight-bold mt-2 ml-1">Notes: </Label>
                  <Input
                    type="textarea"
                    rows="4"
                    name="notes"
                    id="new-pin-notes"
                    placeholder="Pin located 5' off sidewalk and 6.2' from power pole"
                    value={pinNotes}
                    onChange={this.notesChange}
                  />
              </FormGroup>
            </Form>
          </div>
          <div className="card-block px-2 px-0 text-left col-md-4 col-sm-12">
          <Form>
              <FormGroup>
                <Label for="new-pin-image-url" className="font-weight-bold mt-2 ml-1">Image Url: </Label>
                  <Input
                    type="text"
                    name="imageUrl"
                    id="new-pin-image-url"
                    placeholder="https://www.fractracker.org/a5ej20sjfwe/wp-content/uploads/2016/01/survey_symbols_fig17.jpg"
                    value={pinImageUrl}
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
                      value={pinLat}
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
            ? <MyMap propertyLat={property.centerLat} propertyLng={property.centerLng} pinLat={pinLat} pinLng={pinLng} newPin={true} markerPosition={this.markerPosition}/>
            : <div className="text-center">Map loading...</div>
        }
        <button className="btn btn-primary m-3" onClick={this.savePin}>Save Pin</button>
      </div>
    );
  }
}

export default NewPin;
