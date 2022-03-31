# Video Call SDK

Use it for sharing video conferencing logic in different projects
All API are mobx based and provide observable objects

## How to add

Configure `.npmrc` and add package:

    npm i @online/speaker-room-sdk

## How to use

Two different way to use as
- User
- Spectator

**User** - can speak and listen. Require devices access
**Spectator** - only listen. Not require any media access, only initial user interaction with page (click or other, for play video)

## Methodology

1. All public classes provide method `.getObserved()` as a factory method for observable objects or `.get()` for common objects
2. Most important classes wrapped via Provider and can be used via store

### 1. Init and load devices

See example in `src/speaker-room-ui/pallet/media/try-access.tsx`

1. Use React provider HOC`withDevices(Component)`
2. Request access and load default devices
    ```javascript
    const devices = useDevices();
    useEffect(() => {
        devices.requestAccess()
            .then(() => devices.requestDevices())
            .then(() => devices.loadDefaultDevices());
    }, []);
    ```
3. Use observed objects for configure you layout and warning blocks
```jsx
{!devices.isDeviceAccessRequestFinished && <h1>Loading...</h1>}
{(devices.isDeviceAccessRequestFinished && !devices.lastAccessResult?.audio?.access) &&
<h1>No mic access</h1>}
{(devices.isDeviceAccessRequestFinished && !devices.lastAccessResult?.video?.access) &&
<h1>No cam access</h1>}
```
4. Access to methods for obtain devices objects
```jsx
devices.videoDevices.map(d => <Heading2 key={d.deviceId}>{d.label}</Heading2>)
{devices.audioInputDevices.map(d => <Heading2 key={d.deviceId}>{d.label}</Heading2>)}
{devices.audioOutputDevices.map(d => <Heading2 key={d.deviceId}>{d.label}</Heading2>)}
```
> Be careful, audioOutputDevices supported only in Chrome

## 2. Use hardware for start to call. [WIP]

WIP: not finished yet

```javascript
const callManager = useCallManager();
const devices = useDevices();

useEffect(() => {
    callManager.buildFullCall()
        .withUserHardware(devices)
        .widthConfiguration({
            conference: 'test',                 //Call number, like a room name for join
            currentUserId: 'test',              //User unique ID. Should be uniq in call. Prefer global uniq
            currentUserDisplayName: 'test',     //User display name
        })
        .startAsUser(); //or .startAsSpectator()
});
```
> Can't start as user (`#startAsUser`) without request access to mic. Without permission can start only as spectator

For enable `useCall`, and `useDevices`

```typescript
export default withCall(
    withDevices(
        TryCall
    ),
    {
        env: 'development',
        sdk: {
            credentials: {
                userName: 'speaker-room-dev',
                accountName: 'tolkv',
                appName: 'speaker-room'
            },
            localAuthenticationEndpoint: `/api/vox-auth`,
        }
    }
);
```

## Sample media component

```tsx

type Props = {
    callMedia: CallMediaAdapter<unknown>
};
export const CallMediaRenderer: React.FunctionComponent<Props> = observer((
    {
        callMedia
    }
) => {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (ref.current && callMedia?.kind !== UserCallMediaKind.stub &&
            !ref.current.childElementCount) {
            callMedia?.render(ref.current);
        }
    }, [callMedia]);

    if (!callMedia) return <></>;

    if (callMedia.kind === UserCallMediaKind.audio) {
        return <div className={styles.audio} ref={ref} />;
    }

    if ((callMedia.kind === UserCallMediaKind.stub)) {
        return <div className={styles.container}>
            <div className={styles.videoContainer}>
                <div className={styles.stubMedia}>
                    {callMedia.relatedUser?.displayName ?? 'Anon'}
                </div>
            </div>
        </div>
    }

    return (
        <div className={classNames(styles.container)}>
            <div>{callMedia.relatedUser?.displayName ?? 'Anon'}</div>
            <div className={styles.videoContainer} ref={ref} />
        </div>
    );
});
```