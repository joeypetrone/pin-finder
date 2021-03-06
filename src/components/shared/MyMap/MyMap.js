import React from 'react';
import PropTypes from 'prop-types';

import {
  withLeaflet,
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import Search from '../Search/Search';

import './MyMap.scss';

class MyMap extends React.Component {
  static propTypes = {
    propertyLat: PropTypes.number.isRequired,
    propertyLng: PropTypes.number.isRequired,
    pinLat: PropTypes.number,
    pinLng: PropTypes.number,
    pinName: PropTypes.string,
    currentPosition: PropTypes.func,
    markerPosition: PropTypes.func,
    pin: PropTypes.bool,
  }

  state = {
    zoom: 18,
  }

  onMove = (e) => {
    const { currentPosition } = this.props;
    const movePosition = e.target.getCenter();

    if (currentPosition) {
      currentPosition(movePosition);
    }
  }

  setMarker = (e) => {
    const { markerPosition, pin } = this.props;
    if (pin) {
      const clickPosition = { lat: e.latlng.lat, lng: e.latlng.lng };

      markerPosition(clickPosition);
    }
  }

  render() {
    const {
      propertyLat,
      propertyLng,
      pinLat,
      pinLng,
      pinName,
    } = this.props;
    const { zoom } = this.state;

    const WrappedSearch = withLeaflet(Search);

    let mapMarker = '';

    pinLat && pinLng
      ? mapMarker = <Marker position={[pinLat, pinLng]}>
          <Popup>
            <span>{pinName}</span>
          </Popup>
        </Marker>
      : mapMarker = '';

    return (
      <div className="MyMap">
        {
        propertyLat && propertyLng
          ? <Map
              center={[propertyLat, propertyLng]}
              zoom={zoom}
              onMoveEnd={this.onMove}
              onclick={this.setMarker}
            >
              <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {mapMarker}
              <WrappedSearch />
            </Map>
          : <div className="text-center m-4">Data is loading...</div>
        }
      </div>
    );
  }
}

export default MyMap;
