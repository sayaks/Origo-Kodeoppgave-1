import React from "react";

/**
* Create a marker that displays number of bikes available and docks available for a station.
* @param {object} station Station to create a marker for 
* @param {object} station Status of the given station
* @param {function} station Callback for when this marker is clicked 
* @param {boolean} station Whether this marker is selected or not
*/
const Marker = ({ station, status, selectionCallback, selected }) => {
    return (
        <div className="marker" onClick={() => selectionCallback(station.station_id)} data-selected={!!selected}>
            <div className="bike">{status.num_bikes_available}</div>
            <div className="dock">{status.num_docks_available}</div>
        </div>
    );
};
    
export {Marker};