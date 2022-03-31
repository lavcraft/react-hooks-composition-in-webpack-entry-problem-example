import {
    VKInitialConfiguration,
    VKAuthAnonymLoginRequest,
    VKAuthAnonymLoginResponse,
    VKAuthGetTokenForAnonymRequest,
    VKAuthGetTokenForAnonymResponse,
    VKVchatGetAnonymTokenByUserIdExternalRequest,
    VKVchatGetAnonymTokenByUserIdExternalResponse, VKVchatStartConversationExternalRequest,
    VKVchatStartConversationExternalResponse
} from "./http-api";
import {getResponseObjectOrThrow, stringifyJsonToUrl} from "../utils/http-req-res-utils";
import {Client} from "undici";
import {HttpClient} from "../utils/base-http-client";
import {VKVchatAnonymTokenByLinkExternalRequest, VKVchatAnonymTokenByLinkExternalResponse} from "../vk/http-api";

export class VKApiHttpClient {
    private readonly http: Client;

    static build(config: Omit<VKInitialConfiguration, 'middlewareEndpoint'>): VKApiHttpClient {
        return new VKApiHttpClient(config);
    }

    private constructor(private config: Omit<VKInitialConfiguration, 'middlewareEndpoint'>) {
        this.http = new HttpClient(config.endpoint);

    }

    async authAnonymLogin(req: VKAuthAnonymLoginRequest): Promise<VKAuthAnonymLoginResponse> {
        const {pubKey} = this.config;
        const res = await this.http.request({
            method: 'GET',
            path: `/api/auth/anonymLogin?application_key=${pubKey}&id=tesetuser&session_data=${stringifyJsonToUrl({
                version: 2,
                device_id: req.deviceId,
                client_version: 1,
            })}`,
        });

        return await getResponseObjectOrThrow<VKAuthAnonymLoginResponse>(res);
    }

    async authGetTokenForAnonym(params: VKAuthGetTokenForAnonymRequest): Promise<string> {
        const {pubKey} = this.config;
        const res = await this.http.request({
            method: 'GET',
            path: `/api/auth/getTokenForAnonym?application_key=${pubKey}&id=${params.id}`,
        });
        const body = await getResponseObjectOrThrow<VKAuthGetTokenForAnonymResponse>(res);

        return body.token;
    }


    async vchatStartConversationExternal(options: VKVchatStartConversationExternalRequest): Promise<VKVchatStartConversationExternalResponse> {
        const {pubKey} = this.config;
        const {creatorId, conversationId, sessionKey} = options;
        const res = await this.http.request({
            method: "GET",
            path: `/api/vchat/startConversationExternal?application_key=${pubKey}&conversationId=${conversationId}&session_key=${sessionKey}&creator_id=${creatorId}`,
        });
        return await getResponseObjectOrThrow<VKVchatStartConversationExternalResponse>(res);
    }

    async vchatGetAnonymTokenByUserIdExternal(req: VKVchatGetAnonymTokenByUserIdExternalRequest): Promise<VKVchatGetAnonymTokenByUserIdExternalResponse> {
        const {pubKey, appId} = this.config;
        const {joinLink, externalId, sessionKey} = req;
        const res = await this.http.request({
            method: "GET",
            path: `/api/vchat/getAnonymTokenByUserIdExternal?application_key=${pubKey}&application_id=${appId}&externalId=${externalId}&joinLink=${joinLink}&session_key=${sessionKey}`,
        });
        return await getResponseObjectOrThrow<VKVchatGetAnonymTokenByUserIdExternalResponse>(res);
    }

    async vchatGetAnonymTokenByLinkExternal(req: VKVchatAnonymTokenByLinkExternalRequest): Promise<VKVchatAnonymTokenByLinkExternalResponse> {
        const {pubKey, appId} = this.config;
        const {joinCode, sessionKey, anonymName} = req;
        const res = await this.http.request({
            method: "GET",
            path: `/api/vchat/getAnonymTokenByLinkExternal?application_key=${pubKey}&application_id=${appId}&joinLink=${joinCode}&anonymName=${anonymName}&session_key=${sessionKey}`,
        });
        return await getResponseObjectOrThrow<VKVchatAnonymTokenByLinkExternalResponse>(res);
    }
}

