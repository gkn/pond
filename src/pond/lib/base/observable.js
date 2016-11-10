/**
 *  Copyright (c) 2016, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

import _ from "underscore";
import { EventEmitter2 } from 'eventemitter2'

/**
 * Base class for objects in the processing chain which
 * need other object to listen to them. It provides a basic
 * interface to define the relationships and to emit events
 * to the interested observers.
 */

class Observable extends EventEmitter2 {

    constructor () {
        super({
            wildcard: true,
            delimiter: ".",
            newListener: false,
            maxListeners: 100
        })
        this._id = _.uniqueId("id-");
    }

    addEvent(event) {
        this.emit("event", event);
    }

    flush() {
        this.emit("flush");
    }

    addObserver(observer) {
        this.on("event", observer.addEvent);
    }

    hasObservers() {
        console.log(">", this.listenersAny("event").length);
        return this.listenersAny().length > 0;
    }
}

export default Observable;
