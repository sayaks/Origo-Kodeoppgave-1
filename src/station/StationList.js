import React from 'react';
import {Station} from "./Station"; 

/**
 * A react component which displays a list of stations.
 * 
 * @param {array} filteredStations The list of stations to display
 * @param {dict} statusDict Station ids mapped to the corresponding statuses
 * @param {int} selected Which station has been selected
 * @param {function} selectionCallback Function to be called when a station is clicked
 */
const StationList = ({filteredStations, statusDict, selected, selectionCallback}) => {
    if (!filteredStations) {
        return <p>Loading...</p>
    }

    return (
        <ul>
            {filteredStations
                .map((station) => {
                return (
                    <li key={station.station_id}>
                        <Station
                            selected={station.station_id === selected}
                            selectionCallback={selectionCallback}
                            station={station}
                            status={statusDict[station.station_id]}
                        />
                    </li>
                );
            })}
        </ul>
    );
}

export {StationList};