import React, {useState} from 'react';
import './App.css';
import {useData, STATIONS, STATUS} from "./api"
import {StationList} from "./StationList";

const App = () => {

  const [search, setSearch] = useState("");

  console.log(search)

  return (
    <div className="App">
      <input type="text" placeholder="🔎 Søk" onChange={(e) => setSearch(e.target.value)}/>
      <StationList search={search}/>
    </div>
  );
}

export default App;
