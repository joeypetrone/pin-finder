import React from 'react';
import PropTypes from 'prop-types';

import {
  Map,
  TileLayer,
  Marker,
  Popup,
} from 'react-leaflet';

import './MyMap.scss';

class MyMap extends React.Component {
  static propTypes = {
    propertyLat: PropTypes.number.isRequired,
    propertyLng: PropTypes.number.isRequired,
    pinLat: PropTypes.number,
    pinLng: PropTypes.number,
  }

  state = {
    zoom: 20,
  }

  render() {
    const {
      propertyLat,
      propertyLng,
      pinLat,
      pinLng,
    } = this.props;
    const { zoom } = this.state;

    // const setMarker = () => {
    //     pinLat && pinLng
    //     ? return
    //       <Marker position={[pinLat, pinLng]}>
    //         <Popup>
    //           <span>ADDRESS: Loading...</span>
    //         </Popup>
    //       </Marker>
    //     :
    // }

    return (
      <div className="MyMap">
        {
        propertyLat && propertyLng
          ? <Map
              center={[propertyLat, propertyLng]}
              zoom={zoom}
            >
            <TileLayer
                attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            </Map>
          : <div className="text-center m-4">Data is loading...</div>
        }
      </div>
    );
  }
}

export default MyMap;
