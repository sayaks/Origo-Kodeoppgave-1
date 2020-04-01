import React, {useState, useEffect} from 'react';
import './App.css';
import {useData, useFilteredData, STATIONS, STATUS} from "./api"
import {Map} from "./map";
import {StationList} from "./StationList";


const App = () => {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  const selectionCallback = (id) => {
    if (selected === id) {
      setSelected(null);
    } else {
      setSelected(id);
    }
  }


  const stations = useData(STATIONS).data; 
  const status = useData(STATUS).data;
  const [filteredStations, statusDict] = useFilteredData(search, stations, status)

  useEffect(() => {
    if (!stations) {
      return;
    }

    if (!selected) {
      setSearch("");
    } else {
      const station = stations.stations.find((station) => station.station_id === selected);
      setSearch(station.name);
    }



  }, [selected])

  return (
    <div className="App">
      <input type="text" placeholder="🔎 Søk" onChange={(e) => setSearch(e.target.value)}/>
      <Map 
        selectionCallback={selectionCallback}
        selected={selected}
        filteredStations={filteredStations}
        statusDict={statusDict}
      />
      <StationList 
        selectionCallback={selectionCallback}
        selected={selected}
        filteredStations={filteredStations}
        statusDict={statusDict}
      />
    </div>
  );
}

export default App;
