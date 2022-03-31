// @flow
import * as React from 'react';
import dynamic from "next/dynamic";

/**
 * Potential problem and reason to separate useCall and useDevices into different webpack entrypoint
 * This cause problem, because voximplant-websdk npm package not supported import without window object
 */
// import { useCall } from '@company/sdk/store/call';

type Props = {};
const OnlyClientSide = dynamic<Props>(
    () => import('@components/dynamic-component')
        .then(value => value) as any,
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