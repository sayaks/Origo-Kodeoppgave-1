import React from 'react';

/**
 * A react component that displays the station and status.
 * 
 * @param {object} station The station info
 * @param {object} status The station's availability status
 */
const Station = ({station, status}) => {
    return (
    <section className="station">
        <header>
            <h3>{station.name}</h3>
        </header>
        <div className="text bike">Ledige Sykler</div> <div className="num bike">{status.num_bikes_available}</div>
        <div className="text dock">Ledige Låser</div> <div className="num dock">{status.num_docks_available}</div>
    </section>
    );
}

export {Station};