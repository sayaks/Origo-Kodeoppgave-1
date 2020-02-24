import React, {useState} from 'react';
import './App.css';
import {StationList} from "./StationList";

const App = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="App">
      <input type="text" placeholder="🔎 Søk" onChange={(e) => setSearch(e.target.value)}/>
      <StationList search={search}/>
    </div>
  );
}

export default App;
