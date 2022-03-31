import * as React from "react";
import {Manager} from "../call/manager";
import {UserDevices} from "../call/user-devices";


const [ContextDevicesProvider, useDevices] = createStrictContext<UserDevices>({
    name: 'ContextDevices',
    errorMessage: 'Use useDevices must be used only within withDevices',
});

const [ContextCallManagerProvider, useCallManager] = createStrictContext<Manager>({
    name: 'ContextCallManager',
    errorMessage: 'Decorate withCallManager or similar before call useCall* functions'
});

export {
    ContextDevicesProvider,
    useDevices,
    ContextCallManagerProvider,
    useCallManager,
};

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