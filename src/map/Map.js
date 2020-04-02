import React from "react";
import GoogleMapReact from "google-map-react";
import {api_key} from "./api_key";
import {Marker} from "./Marker";

const DEFAULT_CENTER = {lat: 59.911111, lng: 10.733333};
const DEFAULT_ZOOM = 11.5;

/**
 * A google map which displays all the given stations and their available docks and bikes.
 * @param {object} center Where to center the map
 * @param {number} zoom Zoom level of the map
 * @param {array} filteredStations Stations to display 
 * @param {dict} statusDict Map of station ids to the status of the stations
 * @param {int} selected Which station id is selected
 * @param {function} selectionCallback Function to call when a station is selected by the user
 */
const Map = ({center, zoom, filteredStations, statusDict, selected, selectionCallback}) => {
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
              station={station}
              status={statusDict[station.station_id]}
              selectionCallback={selectionCallback}
              selected={selected === station.station_id}
            />)
          })}
        </GoogleMapReact>
      </div>
  );
}

export { Map };