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

const useData = (which) => {
    const [lastUpdate, setUpdate] = useState(0);
    const [data, setData] = useState({});

    const updateSystemInfo = () => {
        fetch(API + SYSTEM, INIT)
            .then(response => response.json())
            .then(data => setUpdate(data.last_updated))
            console.log(lastUpdate)
    };

    useEffect(() => {updateSystemInfo()}, []);

    useEffect(() => {
        fetch(API + which, INIT)
        .then(response => response.json())
        .then(data => setData(data))
    }, [lastUpdate]);


    useEffect(() => {
        const interval = setInterval(updateSystemInfo, 10000);

        return () => {
            clearInterval(interval);
        }
    });

    return data;
}

export {useData, STATIONS, STATUS}