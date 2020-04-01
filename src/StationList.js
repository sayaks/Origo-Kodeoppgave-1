import React from 'react';
import {Station} from "./Station"; 

/**
 * A react component which displays a list of stations from the endpoint.
 * Sorted alphabetically and filtered by a search string.
 * 
 * @param {string} search The search string to filter stations by
 */
const StationList = ({filteredStations, statusDict}) => {
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