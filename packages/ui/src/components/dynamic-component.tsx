import * as React from 'react'
import {useDevices, withDevices} from '@company/sdk';
import {useCall, withCallManager} from '@company/sdk';
// import * as D from '@company/sdk/store/devices';
// import * as T from '@company/sdk/store/call';
import styles from './dynamic-component.module.css';

type Props = {}

// console.log(`withCallManager:`, T.withCallManager);
// console.log(`call module:`, T);

const DynamicComponent: React.FunctionComponent<Props> = () => {
    const devices = useDevices();
    const call = useCall();
    console.log(`useDevices() hook in component return:`, devices);

    return (
        <pre className={styles.container}>
            <b>useDevices hook:</b><span>{useDevices?.toString()}</span>
            <b>devices id:</b><span>{devices?.id}</span>
            <b>useCall hook:</b><span>{useCall?.toString()}</span>
            <b>call id:</b><span>{call?.name}</span>

        </pre>
    );
}

export default withCallManager(
    withDevices(
        DynamicComponent
    )
);