/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/* eslint-disable */

import Observable from "../base/observable";

class A extends Observable {
    constructor() {
        super();
    }
}

class B {
    addEvent(event) {
        console.log(event);
    }
}

it("can emit events", () => {
    const a = new A();
    a.addObserver(event => {
        console.log("1.", event);
    });
    a.addObserver(event => {
        console.log("2.", event);
    });

    console.log(a.hasObservers());

    a.addEvent({value: 1});
});
