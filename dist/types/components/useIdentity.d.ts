import type firebase from 'firebase/app';
import type { AuthApi, Provider, IAuthIdentity } from '../types';
export declare function createUseIdentity<K extends Provider>(api: AuthApi<K>): <U extends firebase.UserInfo>(props?: IAuthIdentity<U> | undefined) => {
    readonly defaultUser: {
        displayName: string;
        photoURL: string;
        email: string;
        uid: string;
    };
    readonly isAuthenticated: boolean;
    readonly user: U;
    readonly emailLink: string;
    readonly avatar: string;
    readonly hasAuthLink: boolean;
    providers: import("../types").ProviderMap<K>;
    signInByLink: (email: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
    signInByProvider: {
        (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
        (provider: firebase.auth.AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
    };
    signInByPassword: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
    signInByPhone: (number: string, verifier: firebase.auth.RecaptchaVerifier) => Promise<(code: string) => Promise<firebase.User>>;
    signOut: (redirect?: string | (() => void) | undefined) => Promise<void>;
};
//# sourceMappingURL=useIdentity.d.ts.map