import firebase from 'firebase/app';
import type { IAuthOptions } from './types';
export declare const IS_DEV: boolean;
export declare const ACTION_CODES: firebase.auth.ActionCodeSettings;
export declare const AUTH_DEFAULTS: IAuthOptions<any>;
export declare const PROVIDERS: {
    google: () => firebase.auth.GoogleAuthProvider;
    facebook: () => firebase.auth.FacebookAuthProvider;
    github: () => firebase.auth.GithubAuthProvider;
    twitter: () => firebase.auth.TwitterAuthProvider;
    microsoft: () => firebase.auth.OAuthProvider;
    yahoo: () => firebase.auth.OAuthProvider;
    apple: () => firebase.auth.OAuthProvider;
    phone: (auth?: firebase.auth.Auth | undefined) => firebase.auth.PhoneAuthProvider;
};
//# sourceMappingURL=constants.d.ts.map