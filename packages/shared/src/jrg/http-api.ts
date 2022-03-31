export enum SpeakerRoomApiResponseStatus {
    no_conference = 'no_conference',
    ok = 'ok',
    error = 'error',
}

export enum SpeakerRoomApiErrorKind {
    external = 'external',
    no_category = 'no_category',
    conflict = 'conflict',
    invalid_input = 'invalid_input',
}

export interface SpeakerRoomApiErrorResponse {
    status: SpeakerRoomApiResponseStatus,
    message?: string,
    kind: SpeakerRoomApiErrorKind,
}
