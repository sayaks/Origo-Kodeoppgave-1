import { useState, useEffect } from 'react';

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
 * and automatically polls the API for updates every 10 seconds.
 * 
 * @param {string} which What API-endpoint to reach
 */
const useData = (which) => {
    const [lastUpdate, setUpdate] = useState(0);
    const [data, setData] = useState({});

    useEffect(() => updateSystemInfo(setUpdate), []);

    useEffect(() => {
        fetch(API + which, INIT)
        .then(response => response.json())
        .then(data => setData(data))
    }, [lastUpdate, which]);


    useEffect(() => {
        const interval = setInterval(() => updateSystemInfo(setUpdate), 10000);

        return () => {
            clearInterval(interval);
        }
    });

    return data;
}

export {useData, STATIONS, STATUS}