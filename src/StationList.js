import React from 'react';
import {useData, STATIONS, STATUS} from "./api"
import {Station} from "./Station"; 

const StationList = ({search}) => {
    const stations = useData(STATIONS).data; 
    const status = useData(STATUS).data;

    if (!stations || !status) {
        return <p>Loading...</p>
    }

    var filteredStations = stations.stations;

    stations.stations.sort((a, b) => a.name.localeCompare(b.name));

    const statusDict = {}

    for (let i = 0; i < status.stations.length; i++) {
        statusDict[status.stations[i].station_id] = status.stations[i];
    }


    if (search) {
        filteredStations = stations.stations.filter((station) => station.name.toLowerCase().startsWith(search.toLowerCase()));
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