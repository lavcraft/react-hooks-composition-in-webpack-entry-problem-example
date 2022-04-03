import * as React from "react";
import {ContextDevicesProvider, useDevices} from "./contexts";
import {UserDevices} from "../call/user-devices";

function withDevices(Component: React.FunctionComponent<any>) {
    const store = UserDevices.getObserved();

    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.devices = store;
    }

    return function (props: any) {
        return React.createElement(
            ContextDevicesProvider, {value: store, key: 'ContextDevices'},
            [
                React.createElement(Component, {...props, key: 'DevicesContextComponentWrapper'})
            ]
        );
    };
}

export {
    withDevices,
    useDevices,
};