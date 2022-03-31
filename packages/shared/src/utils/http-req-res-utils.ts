import {VKErrorResponse} from "../vk/http-api";
import {Dispatcher} from "undici";
import {escape} from "querystring";
import {VKError} from "../vk/http-api";

export async function getResponseObjectOrThrow<T>(res: Dispatcher.ResponseData) {
    if (res.statusCode !== 200) {
        const errorBody = await res.body.text();
        let error = errorBody;
        if (errorBody === '' || !errorBody) {
            error = 'empty';
        }
        throw new Error(`[http][vk] ${res.statusCode}: ${error}`);
    }
    const bodyJson = await res.body.json();

    if (isVKApiError(bodyJson)) {
        throw new VKError(bodyJson);
    }

    return bodyJson as T;
}

function isVKApiError(responseBody: any): responseBody is VKErrorResponse {
    return 'error_code' in responseBody;
}

export function objectToFormData(params: Record<string, string>): string {
    return new URLSearchParams(params).toString();
}

export function stringifyJsonToUrl(obj: Object) {
    return escape(JSON.stringify(obj));
}