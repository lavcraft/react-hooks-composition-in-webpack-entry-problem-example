import * as React from "react";

import {enableStaticRendering} from "mobx-react-lite";
import {Manager} from "../call/manager";
import {ContextCallManagerProvider, useCallManager, useDevices} from "./contexts";
import {CallApi} from "../call/api";
import {VoximplantCall} from "../vox";

enableStaticRendering(typeof window === 'undefined')

export function withCallManager(Component: React.FC) {
    const store = Manager.getObserved();
    if (typeof window !== 'undefined') {
        // @ts-ignore
        window.manager = store;
    }

    return function (props: any) {
        return React.createElement(
            ContextCallManagerProvider, {value: store, key: 'ContextCallManager'},
            [
                React.createElement(Component, {...props, key: 'ContextCallManagerComponentWrapper'})
            ]
        );
    };
}

export function useCall(): CallApi {
    const manager = useCallManager();
    const devices = useDevices();

    console.log(`manager:`, manager);
    console.log(`devices:`, devices);

    let call = manager.getCall();
    if (!call) {
        const callKey = Math.random().toString();
        call = new VoximplantCall();
        manager.addCall(callKey, call);
    }

    return call;
}

export {
    useCallManager,
};