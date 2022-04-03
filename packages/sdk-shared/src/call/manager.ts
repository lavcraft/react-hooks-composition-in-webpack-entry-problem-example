import {makeAutoObservable, observable, values} from "mobx";
import {CallApi} from "./api";

export class Manager {
    private calls = observable.map<string, CallApi>()

    addCall(key: string, call: CallApi) {
        this.calls.set(key, call);
    }

    getCall(key?: string): CallApi | undefined {
        if (key) return this.calls.get(key);
        if (this.calls.size === 0) return;

        return values(this.calls)[0]
    }

    static getObserved() {
        return makeAutoObservable(new Manager());
    }

}