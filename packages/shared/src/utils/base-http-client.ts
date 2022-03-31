import {Client, Dispatcher} from "undici";
import {URL} from "url";

export class HttpClient extends Client {
    // @ts-ignore
    private readonly url: string | URL;

    constructor(url: string | URL, options?: Client.Options) {
        super(url, options);
        this.url = url;
    }

    request(options: Dispatcher.RequestOptions): Promise<Dispatcher.ResponseData> {
        // const msg = `[http] ${options.method} ${this.url}${options.path}`;
        // debug(msg.replace(/key=.*&/, 'key=***&'))
        return super.request(options);
    }
}