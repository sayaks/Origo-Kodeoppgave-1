import React from "react";

/**
 * A react component that displays the station and status.
 * 
 * @param {object} station The station info
 * @param {object} status The station's availability status
 * @param {boolean} selected Whether the station has been selected by the user
 * @param {function} selectionCallback The function to call with station id when it is clicked 
 */
const Station = ({station, status, selected, selectionCallback}) => {
    return (
    <section className="station" onClick={() => selectionCallback(station.station_id)} data-selected={!!selected}>
        <header>
            <h3>{station.name}</h3>
        </header>
        <div className="text bike">Ledige Sykler</div> <div className="num bike">{status.num_bikes_available}</div>
        <div className="text dock">Ledige Låser</div> <div className="num dock">{status.num_docks_available}</div>
    </section>
    );
}

export {Station};