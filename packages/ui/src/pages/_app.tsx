import * as React from "react";
import {AppProps} from "next/app";
import Head from "next/head";
import {configure} from "mobx";


configure({
    enforceActions: "observed",
    computedRequiresReaction: true,
    reactionRequiresObservable: true,
    observableRequiresReaction: true,
    disableErrorBoundaries: true
});

const App = ({Component, pageProps}: AppProps) => {

    return (
        <>
            <Head>
                <title>React hook composition in webpack module example</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default App;