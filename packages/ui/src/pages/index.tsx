// @flow
import * as React from 'react';
import dynamic from "next/dynamic";

/**
 * Potential problem and reason to separate useCall and useDevices into different webpack entrypoint
 * This cause problem, because voximplant-websdk npm package not supported import without window object
 */
// import { useCall } from '@company/sdk/store/call';
import * as T from '@company/sdk/store/devices';
import * as C from '@company/sdk/store/contexts';

console.log(`contexts:`, C);
console.log(`devices module:`, T);
console.log(`devices.withDevices:`, T.withDevices);

type Props = {};
const OnlyClientSide = dynamic<Props>(
    () => import('@components/dynamic-component')
        .then(value => value)
        .catch(r => console.error(`error while import component which used useDevices/withDevices and useCall/withCall: ${r}`, r)) as any,
    {
        ssr: false,
        loading: () => <p>Loading...</p>,
    }
);
export const IndexPage: React.FunctionComponent<Props> = () => {
    return (
        <div>
            <OnlyClientSide/>
        </div>
    );
};

export default IndexPage