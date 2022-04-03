// import {Hardware} from 'voximplant-websdk';
import type {CallApi} from "@company/sdk-shared/call/api";

export class VoximplantCall implements CallApi {

    constructor() {
        // console.log(`voximplant hardware:`, Hardware);
    }

    join(): void {
    }

    get name(): string {
        return "";
    }
}