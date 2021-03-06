/**
 *  Copyright (c) 2015-2017, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/* eslint-disable */

import _ from "underscore";
import TimeSeries from "../timeseries";
import { sum } from "../base/functions";

import data from "./interfaces.json";

it("can take 80 interfaces and sum them together in less than 2 sec", () => {
    const interfaceListData = data.data.networkEntity.interfaces;
    const interfaces = interfaceListData
        .map(iface => JSON.parse(iface.traffic))
        .map(traffic => new TimeSeries(traffic));

    const list = [];
    for (let i = 0; i < 10; i++) {
        interfaces.forEach(timeseries => list.push(timeseries));
    }

    const begin = new Date().getTime();
    const result = TimeSeries.timeSeriesListReduce({
        name: "sum",
        seriesList: list,
        reducer: sum(),
        fieldSpec: ["in", "out"]
    });
    const end = new Date().getTime();
    //console.log("Time", (end - begin)/1000, "sec");
    // Disabled this test because there's no way to get this consistent on travis
    //expect(result.avg("in")).toEqual(115466129590.72786);
    //expect(result.avg("out")).toEqual(120824846698.03258);
    //expect((end - begin) / 1000).toBeLessThan(2.0);
});

it("can take 80 interfaces and sum them together in less than 2 sec", () => {
    const interfaceListData = data.data.networkEntity.interfaces;
    const interfaces = interfaceListData
        .map(iface => JSON.parse(iface.traffic))
        .map(traffic => new TimeSeries(traffic));

    // Split an interface into 24 1 hour timeseries
    const tileMap = interfaces[0].collectByFixedWindow({ windowSize: "1h" });
    const tileList = _.map(tileMap, tile => tile);

    // Now merge them
    const begin = new Date().getTime();
    const trafficSeries = TimeSeries.timeSeriesListMerge({
        name: "traffic",
        seriesList: tileList
    });
    const end = new Date().getTime();
    //console.log("Time", (end - begin), "msec", trafficSeries.size());
    // Disabled this test because there's no way to get this consistent on travis
    //expect(end - begin).toBeLessThan(120);
});
