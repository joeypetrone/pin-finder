import React from 'react';
import PropTypes from 'prop-types';

import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import Search from 'react-leaflet-search';
import { CoordinatesControl } from 'react-leaflet-coordinates';

import './MyMap.scss';

class MyMap extends React.Component {
  static propTypes = {
    propertyLat: PropTypes.number.isRequired,
    propertyLng: PropTypes.number.isRequired,
    pinLat: PropTypes.number,
    pinLng: PropTypes.number,
    pinName: PropTypes.string,
  }

  state = {
    zoom: 18,
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
              zoomControl={false}
            >
            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <CoordinatesControl />
            {mapMarker}
            <Search position="topleft" zoom={zoom}/>
            </Map>
          : <div className="text-center m-4">Data is loading...</div>
        }
      </div>
    );
  }
}

export default MyMap;
