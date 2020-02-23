import React from 'react';
import './App.css';
import {useData, STATIONS, STATUS} from "./api"
import {StationList} from "./StationList";

function App() {
  return (
    <div className="App">
      <StationList/>
    </div>
  );
}

export default App;
