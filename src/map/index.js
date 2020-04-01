import React from 'react';
import GoogleMapReact from 'google-map-react';
import {api_key} from './api_key';

const Marker = ({ status }) => {
  return (
    <div className="marker">
      <div className="bike">{status.num_bikes_available}</div>
      <div className="dock">{status.num_docks_available}</div>
    </div>
  );
}

const DEFAULT_CENTER = {lat: 59.911111, lng: 10.733333};
const DEFAULT_ZOOM = 11;

const Map = ({center, zoom, filteredStations, statusDict}) => {

  return (
    <div className="mapdiv">
        <GoogleMapReact
          bootstrapURLKeys={{ key: api_key }}
          defaultCenter={center || DEFAULT_CENTER}
          defaultZoom={zoom || DEFAULT_ZOOM}
        >
          {(filteredStations || []).map((station) => {
            return (<Marker
              key={station.station_id}
              lat={station.lat}
              lng={station.lon}
              status={statusDict[station.station_id]}
            />)
          })}
        </GoogleMapReact>
      </div>
  );
}
  

export {Map}