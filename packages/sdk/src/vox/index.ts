import {Hardware} from 'voximplant-websdk';
import {CallApi} from "../call/api";


export class VoximplantCall implements CallApi {

    constructor() {
        console.log(`voximplant hardware:`, Hardware);
    }

    join(): void {
    }

    get name(): string {
        return "";
    }
}