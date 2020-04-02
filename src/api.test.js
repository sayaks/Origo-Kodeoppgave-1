import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { API, STATIONS, STATUS, SYSTEM, useData, useFilteredData } from "./api";

const TEST_ENDPOINT = "foo";

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const FakeComponent = ({resultCallback}) => {
    const data = useData(TEST_ENDPOINT, 1000);
    if (resultCallback) {
        resultCallback(data);
    }
    return null;
}

test("useData queries the right endpoint", async () => {
    const fakeResponse = {
        last_updated: 10
    };
    
    var endpoint = null;
    
    jest.spyOn(global, "fetch").mockImplementation((queried_endpoint) => {
        endpoint = queried_endpoint;
        
        return Promise.resolve({
            json: () => Promise.resolve(fakeResponse)
        }); 
    });
    
    await act(async () => {
        render(<FakeComponent />, container);
    });
    
    expect(endpoint).toBe(API + TEST_ENDPOINT);
});

test("useData updates the data properly over time", async () => {
    const fakeResponse1 = {
        last_updated: 10,
        data: "foo",
    };
    
    const fakeResponse2 = {
        last_updated: 20,
        data: "bar",
    };
    
    var return_first = true;
    
    jest.spyOn(global, "fetch").mockImplementation(() => {
        if (return_first) {
            return Promise.resolve({
                json: () => Promise.resolve(fakeResponse1)
            }); 
        } else {
            return Promise.resolve({
                json: () => Promise.resolve(fakeResponse2)
            }); 
        }
    });
    
    var first_response = null;
    var second_response = null;
    
    const callback = (data) => {
        if (return_first) {
            first_response = data;
        } else {
            second_response = data;
        }
    }
    
    await act(async () => {
        render(<FakeComponent resultCallback={callback} />, container);
        await new Promise(r => setTimeout(r, 500));
        return_first = false;
        await new Promise(r => setTimeout(r, 1100));
    });
    
    expect(first_response).toBe(fakeResponse1);
    expect(second_response).toBe(fakeResponse2);
});

const FakeFilteredComponent = ({resultCallback, search}) => {
    const stations = useData(STATIONS, 100000).data;
    const status = useData(STATUS, 100000).data;
    const [filteredStations, statusDict] = useFilteredData(search, stations, status); 
    if (resultCallback) {
        resultCallback(filteredStations, statusDict);
    }
    return null;
}

const fakeStatus = {
    last_updated: 10,
    data: {
        stations: [
            { station_id: 50 },
            { station_id: 100 },
            { station_id: 150 }
        ]
    }
}

test("useFilteredData sorts the data by name", async () => {
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
    
    jest.spyOn(global, "fetch").mockImplementation((query) => {
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
    });
    
    var filteredStations = null;
    
    const callback = (stations) => {
        filteredStations = stations;
    }
    
    await act(async () => {
        render(<FakeFilteredComponent resultCallback={callback} />, container);
        await new Promise(r => setTimeout(r, 100));
    });
    
    var cur_name = "";

    filteredStations.forEach(element => {
        expect(cur_name < element.name).toBeTruthy();
        cur_name = element.name;
    });
});

test("useFilteredData filters the data", async () => {
    const fakeStations = {
        last_updated: 10,
        data: {
            stations: [
                {
                    station_id: 50,
                    name: "aaa"
                },
                {
                    station_id: 100,
                    name: "abb"
                },
                {
                    station_id: 150,
                    name: "bbb"
                }
            ]
        }
    };
    
    jest.spyOn(global, "fetch").mockImplementation((query) => {
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
    });

    var filteredStations = null;
    
    const callback = (stations) => {
        filteredStations = stations;
    }
    
    const search = "a";

    await act(async () => {
        render(<FakeFilteredComponent search={search} resultCallback={callback} />, container);
        await new Promise(r => setTimeout(r, 100));
    });
    
    filteredStations.forEach(element => {
        expect(element.name.startsWith(search)).toBeTruthy();
    });
})