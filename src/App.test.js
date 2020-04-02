import React from 'react';
import { render } from '@testing-library/react';
import { unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import App from './App';
import { API, STATIONS, STATUS, SYSTEM, useData, useFilteredData } from './api';

const fakeStations = {
  last_updated: 10,
  data: {
      stations: [
          {
              station_id: 50,
              name: "bbbbb"
          },
          {
              station_id: 100,
              name: "aaaaa"
          },
          {
              station_id: 150,
              name: "ccccc"
          }
      ]
  }
};

const fakeStatus = {
  last_updated: 10,
  data: {
      stations: [
          { 
            station_id: 50,
            num_bikes_available: 10,
            num_docks_available: 11,
          },
          { 
            station_id: 100,
            num_bikes_available: 12,
            num_docks_available: 13,
          },
          { 
            station_id: 150,
            num_bikes_available: 14,
            num_docks_available: 15,
          }
      ]
  }
}

const fakeFetch = (query) => {
  if (query === API + STATIONS) {
      return Promise.resolve({
          json: () => fakeStations
      });
  } else if (query === API + STATUS) {
      return Promise.resolve({
          json: () => fakeStatus
      });
  } else if (query === API + SYSTEM) {
      return Promise.resolve({
          json: () => ({last_updated: 10})
      });
  } else {
      return Promise.resolve({
          json: () => {}
      });
  }
};

test("names of stations show up", async () => {
  jest.spyOn(global, "fetch").mockImplementation(fakeFetch);

  var appGetByText = null

  await act(async () => {
    const { getByText } = render(<App />);
    await new Promise(r => setTimeout(r, 100));
    appGetByText = getByText;
  });

  fakeStations.data.stations.forEach(element => {
    expect(appGetByText(element.name)).toBeInTheDocument();
  });
});