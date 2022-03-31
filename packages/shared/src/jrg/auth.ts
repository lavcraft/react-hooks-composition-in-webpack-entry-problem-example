/**
 * LK User Profile
 * <pre><code>
 *  {
 *   authorities: [ { authority: 'regular' } ],
 *   details: null,
 *   authenticated: true,
 *   principal: 'GOOGLE_ID:112038953533690812997',
 *   credentials: null,
 *   id: 721194,
 *   sessionId: 20572,
 *   name: 'GOOGLE_ID:112038953533690812997'
 * }
 * </code></pre>
 */
export interface JRGAuthProfile extends Record<string, unknown> {
    id: string;
    sub: string;
    name: string;
    email: string;
    picture: string;
    roles: string[];
    authorities: JRGAuthAuthority[];
    authenticated: boolean;
    sessionId: string;
    principal: string;

}

export interface JRGAuthAuthority {
    authority: string;
}

export interface JRGAuthAzureProfile extends JRGAuthProfile {
    preferred_username: string;
}

export interface JRGAccount extends Record<string, unknown> {
    roles: string[];
    isInternal: boolean;
    expires_in: number;
}

export interface JRGToken {
    email?: string;
    roles?: string;
    sub: string;
    approved: boolean;
    external: boolean;
    iat: number;
    exp: number;
}