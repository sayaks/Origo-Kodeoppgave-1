import React from 'react';
import { render } from '@testing-library/react';
import {Station} from './Station';

test('displays station info in station box', () =>{
    const fakeStation = {name: "foo", station_id: 100};
    const fakeStatus = {num_bikes_available: 33, num_docks_available: 66}
    const fakeFunction = () => {};

    const { getByText } = render(<Station station={fakeStation} status={fakeStatus} selected={false} selectionCallback={fakeFunction}/>);
    expect(getByText(fakeStation.name)).toBeInTheDocument();
    expect(getByText((content, element) => element.className == "num bike" && content == fakeStatus.num_bikes_available)).toBeInTheDocument();
    expect(getByText((content, element) => element.className == "num dock" && content == fakeStatus.num_docks_available)).toBeInTheDocument();
});
