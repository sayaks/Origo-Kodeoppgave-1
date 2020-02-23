import React, { useState, useEffect } from 'react';

const API = "https://gbfs.urbansharing.com/oslobysykkel.no/";
const SYSTEM = "system_information.json";
const STATIONS = "station_information.json";
const STATUS = "station_status.json";

const useData = (which) => {
    const [lastUpdate, setUpdate] = useState(0);
    const [data, setData] = useState(null);

    const updateSystemInfo = () => {
        fetch(API + SYSTEM)
            .then(response => response.json())
            .then(data => setUpdate(data.last_updated))
            console.log(lastUpdate)
    };

    useEffect(() => {updateSystemInfo()}, {});

    useEffect(() => {
        fetch(API + SYSTEM)
        .then((response) => { 
            setData(response.json()) 
        })
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