import React from 'react';
import { render } from '@testing-library/react';
import {StationList} from './StationList';

test('displays correct station info in station boxes', () =>{
    const fakeStations = [
        {station_id: 50, name: "foo"},
        {station_id: 100, name: "bar"},
    ];

    const fakeStatusDict = {
        50: {num_bikes_available: 33, num_docks_available: 66},
        100: {num_bikes_available: 40, num_docks_available: 80}
    };

    const fakeSelected = 100;

    const fakeFunction = () => {};

    const {getByText} = render(<StationList filteredStations={fakeStations} statusDict={fakeStatusDict} selected={fakeSelected} selectionCallback={fakeFunction}/>);

    expect(getByText((_, element) => {
        if (element.className == 'station' && element.getElementsByTagName('header')[0].textContent == fakeStations[0].name) {
            return element.getElementsByClassName('num bike')[0].textContent == fakeStatusDict[fakeStations[0].station_id].num_bikes_available &&
                   element.getElementsByClassName('num dock')[0].textContent == fakeStatusDict[fakeStations[0].station_id].num_docks_available;
        }
    })).toBeInTheDocument();
});