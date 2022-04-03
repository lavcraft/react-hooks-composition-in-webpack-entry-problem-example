import * as React from "react";
import {UserDevices} from "../call/user-devices";

const [ContextDevicesProvider, useDevices] = createStrictContext<UserDevices>({
    name: 'ContextDevices',
    errorMessage: 'Use useDevices must be used only within withDevices',
});

//TODO extract to utils
function createStrictContext<T>(
    options: {
        errorMessage?: string
        name?: string
    } = {}
) {
    const Context = React.createContext<T | undefined>(undefined)
    Context.displayName = options.name // for DevTools

    function useContext() {
        const context = React.useContext(Context);
        console.trace(`look at ${options.name}:`, context);
        if (context === undefined) {
            throw new Error(
                options.errorMessage || `${options.name || ''} Context Provider is missing`
            )
        }
        return context
    }

    return [Context.Provider, useContext] as [React.Provider<T>, () => T]
}

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