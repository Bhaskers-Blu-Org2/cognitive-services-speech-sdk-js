// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { ArgumentNullError } from "../common/Exports";
import { AuthInfo, IAuthentication } from "./IAuthentication";

const AuthHeader: string = "Authorization";

export class CognitiveTokenAuthentication implements IAuthentication {
    private privFetchCallback: (authFetchEventId: string) => Promise<string>;
    private privFetchOnExpiryCallback: (authFetchEventId: string) => Promise<string>;

    constructor(fetchCallback: (authFetchEventId: string) => Promise<string>, fetchOnExpiryCallback: (authFetchEventId: string) => Promise<string>) {
        if (!fetchCallback) {
            throw new ArgumentNullError("fetchCallback");
        }

        if (!fetchOnExpiryCallback) {
            throw new ArgumentNullError("fetchOnExpiryCallback");
        }

        this.privFetchCallback = fetchCallback;
        this.privFetchOnExpiryCallback = fetchOnExpiryCallback;
    }

    public fetch = async (authFetchEventId: string): Promise<AuthInfo> => {
        const token = await this.privFetchCallback(authFetchEventId);
        return new AuthInfo(AuthHeader, token);
    }

    public fetchOnExpiry = async (authFetchEventId: string): Promise<AuthInfo> => {
        const token = await this.privFetchOnExpiryCallback(authFetchEventId);
        return new AuthInfo(AuthHeader, token);
    }
}
