import React, {useState} from 'react';
import './App.css';
import {useData, useFilteredData, STATIONS, STATUS} from "./api"
import {Map} from "./map";
import {StationList} from "./StationList";

const App = () => {
  const [search, setSearch] = useState("");

  const stations = useData(STATIONS).data; 
  const status = useData(STATUS).data;
  const [filteredStations, statusDict] = useFilteredData(search, stations, status)

  return (
    <div className="App">
      <input type="text" placeholder="🔎 Søk" onChange={(e) => setSearch(e.target.value)}/>
      <Map 
        filteredStations={filteredStations}
        statusDict={statusDict}
      />
      <StationList 
        filteredStations={filteredStations}
        statusDict={statusDict}
      />
    </div>
  );
}

export default App;
