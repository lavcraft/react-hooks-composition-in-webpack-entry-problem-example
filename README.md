# React hook composite with webpack example

Reproduce problem occurred when compose two react hooks from different webpack entries

## How to start

If you have tmux, will run:
`npm run all:start`

Otherwise:
`npm run sdk:dev`
and next (in different terminal)
`npm run ui:dev`

And now - `open http://localhost:3000`

## Project structure

1. sdk - project with webpack package. Contained useful hooks
2. shared - project with shared code, for sdk an other project (just for example)
3. ui - main project

## Problem explanation

When you open page, you see logs in console with stacktraces:

    look at ContextDevices: Object
    look at ContextCallManager: Object
    look at ContextDevices: undefined
    look at ContextDevices: Object
    look at ContextCallManager: Object
    look at ContextDevices: undefined

Detailed research show, that useDevices throw error only when call from useCall:

```javascript
export function useCall(): CallApi {
    const manager = useCallManager();
    const devices = useDevices();
...
}
```

> Directed by Robert B. Weide

## Problem solving

To be continued...