import {getResponseObjectOrThrow, objectToFormData, stringifyJsonToUrl} from "../http-req-res-utils";

import {expect} from "@jest/globals";

describe('VK Utils tests', () => {

    it('getResponseObjectOrThrow should thrown error when sth went wrong during vk api call', async () => {
        await expect(getResponseObjectOrThrow({
                statusCode: 403,
                // @ts-ignore
                body: {
                    text: () => Promise.resolve('sth wen wrong'),
                    json: () => Promise.resolve({error_code: 111, error_msg: 'test'})
                }
            })
        )
            .rejects
            .toThrow(new Error('[http][vk] 403: sth wen wrong'));
    });

    it('getResponseObjectOrThrow should return expected body', async () => {
        await expect(getResponseObjectOrThrow<{name: string}>({
                statusCode: 200,
                // @ts-ignore
                body: {
                    json: () => Promise.resolve({name: 'Me'})
                }
            })
        )
            .resolves
            .toEqual({name: 'Me'})
    });

    it('should throw generic error when no 200 response',async () => {
        await expect(getResponseObjectOrThrow({
                statusCode: 403,
                // @ts-ignore
                body: {
                    text: () => Promise.resolve('some error')
                }
            })
        )
            .rejects
            .toThrow(new Error('[http][vk] 403: some error'));
    });

    it('should throw generic error when no 200 response with empty body', async () => {
        await expect(getResponseObjectOrThrow({
                statusCode: 403,
                // @ts-ignore
                body: {
                    text: () => Promise.resolve('')
                }
            })
        )
            .rejects
            .toThrow(new Error('[http][vk] 403: empty'));
    });

    it('should convert form data to field', () => {
        const result = objectToFormData({
            session_key: 'dsffsd',
            test: 'test_Data',
            test_specical: 'fsd sdf',
            test_dot: 'fsd/sfd'
        });

        expect(result).toEqual('session_key=dsffsd&test=test_Data&test_specical=fsd+sdf&test_dot=fsd%2Fsfd')
    });

    it('should encode session data', () => {
        const res = objectToFormData({session_data: '{"version":2,"device_id":"mail_ru_server_test","client_version":1}'})
        expect(res).toEqual('session_data=%7B%22version%22%3A2%2C%22device_id%22%3A%22mail_ru_server_test%22%2C%22client_version%22%3A1%7D')
    });


    it('should escape json with number', () => {
        expect(
            stringifyJsonToUrl({
                version: 2,
                device_id: 'mail_ru_server_test',
                client_version: 1
            })
        ).toEqual('%7B%22version%22%3A2%2C%22device_id%22%3A%22mail_ru_server_test%22%2C%22client_version%22%3A1%7D');
    });
});