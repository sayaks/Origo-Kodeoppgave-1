import React from 'react';

const Station = ({station, status}) => {
    return (
    <section className="station">
        <header>
            <h3>{station.name}</h3>
        </header>
        <div className="bikes">Ledige Sykler</div> <div className="bikes count">{status.num_bikes_available}</div>
        <div className="docks">Tilgjengelige Låser</div> <div className="docks count">{status.num_docks_available}</div>
    </section>
    );
}

export {Station};