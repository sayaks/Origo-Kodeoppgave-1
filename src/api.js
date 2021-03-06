import { useState, useEffect } from "react";

const API = "https://gbfs.urbansharing.com/oslobysykkel.no/";
const SYSTEM = "system_information.json";
const STATIONS = "station_information.json";
const STATUS = "station_status.json";
const INIT = {
    method: "GET",
    cache: "default",
    mode: "cors",
    headers: {
    } 
}


const updateSystemInfo = (setUpdate) => {
    fetch(API + SYSTEM, INIT)
        .then(response => response.json())
        .then(data => setUpdate(data.last_updated))
};

/**
 * A hook which returns the data associated with the API-endpoint,
 * and automatically polls the API for updates every 10 seconds by default.
 * 
 * @param {string} which What API-endpoint to reach
 * @param {int} refreshRate How many milliseconds between each update
 */
const useData = (which, refreshRate) => {
    const [lastUpdate, setUpdate] = useState(0);
    const [data, setData] = useState({});

    useEffect(() => updateSystemInfo(setUpdate), []);

    useEffect(() => {
        fetch(API + which, INIT)
        .then(response => response.json())
        .then(data => setData(data))
    }, [lastUpdate, which]);

    useEffect(() => {
        const interval = setInterval(() => updateSystemInfo(setUpdate), refreshRate || 10000);

        return () => {
            clearInterval(interval);
        }
    });

    return data;
}

/**
 * A hook which sorts and filters the stations array, and also creates a map of station ids to statuses.
 * @param {string} search The string to search by
 * @param {array} stations Stations to search through
 * @param {array} status Statuses of all the stations 
 * @returns {array} the filtered stations and status dictionary 
 */
const useFilteredData = (search, stations, status) => {
    if (!stations || !status) {
        return [null, null];
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

    return [filteredStations, statusDict];
}

export {useData, useFilteredData, API, STATIONS, STATUS, SYSTEM}