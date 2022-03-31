import {makeAutoObservable} from "mobx";

export class UserDevices {
    id = Math.random();

    static getObserved() {
        return makeAutoObservable(new UserDevices());
    }
}