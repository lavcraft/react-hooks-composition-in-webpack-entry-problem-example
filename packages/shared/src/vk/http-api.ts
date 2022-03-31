export interface VKInitialConfiguration {
    endpoint: string; //https://videotestapi.ok.ru or https://api.ok.ru/,
    middlewareEndpoint: string; //endpoint for your backend, for proxying server side request to VK API (with for example credentials)
    appId: string;
    pubKey: string;
}

export interface VKErrorResponse {
    error_code: number;
    error_msg: string;
    error_data?: string;
    error_field?: string;
}

export interface VKRequestWithSession {
    sessionKey: string;
}

export interface VKAuthAnonymLoginRequest {
    deviceId: string;
}

export interface VKAuthAnonymLoginResponse {
    session_key: string;
    session_secret_key: string;
    api_server: string;
    activated_profile: string;
}

export interface VKAuthGetTokenForAnonymRequest {
    id: string;
    name?: string;
    phone?: string;
}

export interface VKAuthGetTokenForAnonymResponse {
    token: string;
}

export interface VKVchatStartConversationExternalRequest extends VKRequestWithSession {
    conversationId: string;
    isVideo?: boolean;
    creatorId: string;
    domainId?: string;
    requireAuthToJoin?: boolean;
    speakerIds?: string[];
}

export interface VKVchatStartConversationExternalResponse {
    id: string;
    join_link: string;
    sessionKey: string;
}

export interface VKVchatGetAnonymTokenByUserIdExternalRequest {
    externalId: string;
    joinLink: string;
    sessionKey: string;
}

export interface VKVchatGetAnonymTokenByUserIdExternalResponse {
    token: string;
}

export interface VKVchatAnonymTokenByLinkExternalRequest {
    joinCode: string;
    anonymName?: string;
    sessionKey: string;
}

export interface VKVchatAnonymTokenByLinkExternalResponse {
    external_user_id: string;
    token: string;
}

export class VKError extends Error {
    private readonly error_code: number;
    private readonly error_msg: string;
    private readonly error_data?: string;
    private readonly error_field?: string;

    constructor(response: VKErrorResponse) {
        super(`[http][vk] Receive VK error. code: ${response.error_code}, msg: ${response.error_msg}, field: ${response.error_field}, data: ${response.error_data}`);

        // restore prototype chain
        const actualProto = new.target.prototype;

        if (Object.setPrototypeOf) {
            Object.setPrototypeOf(this, actualProto);
        } else {
            // @ts-ignore
            this.__proto__ = actualProto;
        }

        this.error_code = response.error_code
        this.error_msg = response.error_msg
        this.error_data = response.error_data
        this.error_field = response.error_field
    }

    get errorCode() {
        return this.error_code;
    }

    get errorMsg() {
        return this.error_msg;
    }

    get errorData() {
        return this.error_data;
    }

    get errorField() {
        return this.error_field;
    }
}