import {VKApiHttpClient} from "../http-client-vk";
import {expect} from "@jest/globals";
import {randomUUID} from "crypto";

describe('VK Api Client tests', () => {

    it('should get token via api', async () => {
        const api = VKApiHttpClient.build({
            endpoint: 'https://videotestapi.ok.ru',
            appId: '512000673592',
            pubKey: 'CJDIEPJGDIHBABABA',
        });

        const token = await api.authGetTokenForAnonym({
            id: 'Юла2',
        });

        expect(token).toBeDefined();
    });

    it('should login for antonym', async () => {
        const api = VKApiHttpClient.build({
            endpoint: 'https://videotestapi.ok.ru',
            appId: '512000673592',
            pubKey: 'CJDIEPJGDIHBABABA',
        });

        const response = await api.authAnonymLogin({deviceId: 'jrg_test_device_creator'});

        expect(response).toBeDefined();
    });

    it('should get anonym login by external user id', async () => {
        //given
        const api = VKApiHttpClient.build({
            endpoint: 'https://videotestapi.ok.ru',
            appId: '512000673592',
            pubKey: 'CJDIEPJGDIHBABABA',
        });
        const userId = randomUUID();
        const vkAuthAnonymLoginResponse = await api.authAnonymLogin({deviceId: userId});
        const session_key = vkAuthAnonymLoginResponse.session_key
        const conversationId = randomUUID();
        const vkVchatStartConversationExternalResponse = await api.vchatStartConversationExternal({
            conversationId,
            creatorId: 'jrg_tolkachev_kirill_creator',
            sessionKey: session_key,
        });

        //when
        const response = await api.vchatGetAnonymTokenByUserIdExternal({
            externalId: userId,
            joinLink: vkVchatStartConversationExternalResponse.join_link,
            sessionKey: session_key,
        });

        //then
        expect(response.token).toBeDefined();
    });

    it('should get anonym token by join code', async () => {
        //given
        const api = VKApiHttpClient.build({
            endpoint: 'https://videotestapi.ok.ru',
            appId: '512000673592',
            pubKey: 'CJDIEPJGDIHBABABA',
        });
        const userId = randomUUID();
        const vkAuthAnonymLoginResponse = await api.authAnonymLogin({deviceId: userId});
        const session_key = vkAuthAnonymLoginResponse.session_key
        await api.authGetTokenForAnonym({
            id: userId,
        });
        const conversationId = randomUUID();
        const vkVchatStartConversationExternalResponse = await api.vchatStartConversationExternal({
            conversationId,
            creatorId: 'jrg_tolkachev_kirill_creator',
            sessionKey: session_key,
        });

        //when
        const response = await api.vchatGetAnonymTokenByLinkExternal({
            joinCode: vkVchatStartConversationExternalResponse.join_link,
            anonymName: 'jrg-test-user',
            sessionKey: session_key,
        });

        //then
        expect(response).toEqual(expect.objectContaining({
            external_user_id: expect.any(String),
            token: expect.any(String),
        }))
        expect(response.external_user_id).toBeDefined();
        expect(response.token).toBeDefined();
    });

    it('should create conversation on server', async () => {
        //given
        const api = VKApiHttpClient.build({
            endpoint: 'https://videotestapi.ok.ru',
            appId: '512000673592',
            pubKey: 'CJDIEPJGDIHBABABA',
        });

        //when anonym login
        const vkAuthAnonymLoginResponse = await api.authAnonymLogin({deviceId: 'jrg_test_device_creator'});
        const session_key = vkAuthAnonymLoginResponse.session_key

        //then should contain session_key
        expect(session_key).toBeDefined();

        //and when get token for anonym
        const token = await api.authGetTokenForAnonym({
            id: 'jrg_tolkachev_kirill_creator'
        });
        //then return token
        expect(token).toBeDefined();

        //and when start conversation
        const conversationId = randomUUID();
        const vkVchatStartConversationExternalResponse = await api.vchatStartConversationExternal({
            conversationId,
            creatorId: 'jrg_tolkachev_kirill_creator',
            sessionKey: session_key,
        });
        //then return join link and id
        expect(vkVchatStartConversationExternalResponse).toEqual(
            expect.objectContaining({
                id: expect.stringMatching(/.*-.*-.*-.*/)
            })
        )
    });
});