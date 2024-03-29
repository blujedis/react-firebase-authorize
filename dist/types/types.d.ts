import type firebase from 'firebase/app';
declare class TypeWrapper<K extends Provider> {
    main(options: IAuthOptions<K>): {
        options: IAuthOptions<K>;
        log: {
            (message: string): void;
            <E extends Error>(error: E): void;
            (data: Record<string, any>): void;
            (type: "log" | "fatal" | "error" | "warn" | "info" | "debug", message: string): void;
            <E_1 extends Error>(type: "log" | "fatal" | "error" | "warn" | "info" | "debug", error: E_1): void;
            (type: "log" | "fatal" | "error" | "warn" | "info" | "debug", data: Record<string, any>): void;
        };
        link: {
            signUp: (email: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
            signIn: (email: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
        };
        model: {
            findById: (uid: string) => any;
            create: <T extends firebase.UserInfo>(user: T) => void;
            update: <T_1 extends Partial<firebase.UserInfo> & Record<string, any>>(user: T_1) => void;
            handleCredential: (userCredential: IAuthCredential, suppressPersist?: boolean) => Promise<firebase.User>;
        };
        password: {
            sendPasswordReset: (email: string) => Promise<boolean>;
            confirmPasswordReset: (code: string, newPassword: string) => Promise<boolean>;
            verifyPasswordReset: (code: string) => Promise<string>;
            updatePassword: (newPassword: string) => Promise<boolean>;
            sendVerification: (actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
            updateProfile: (profile: {
                displayName?: string | undefined;
                photoURL?: string | undefined;
            }) => Promise<boolean>;
            signIn: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
            signUp: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
        };
        phone: {
            signIn: (number: string, verifier: firebase.auth.RecaptchaVerifier) => Promise<(code: string) => Promise<firebase.User>>;
        };
        providers: ProviderMap<K>;
        provider: {
            providers: ProviderMap<K>;
            link: {
                (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
                (provider: firebase.auth.AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
            };
            signIn: {
                (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
                (provider: firebase.auth.AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
            };
        };
        watchState: (handler?: ((user: firebase.User | null) => void) | undefined, signOutRedirect?: string | (() => void) | undefined) => any;
        unsubscribeWatchState: firebase.Unsubscribe;
        signOut: (redirect?: string | (() => void) | undefined) => any;
        hasAuthLink: () => any;
        hasProvider: <U extends firebase.User>(user: U, ...providers: string[]) => boolean;
        ensureDisplayName: <U_1 extends firebase.UserInfo>(user: U_1) => U_1;
        mapUser: <U_2 extends Record<string, any>>(user: firebase.User | null, extend?: U_2) => (firebase.UserInfo & U_2) | null;
        hasStorageUser: () => boolean;
        hasStorageEmailLink: () => boolean;
        getStorageUser: <T_2 extends firebase.UserInfo>(def?: T_2) => T_2;
        getStorageEmailLink: <T_3 extends string>(def?: T_3) => T_3;
        setStorageUser: (value: string | number | boolean | Date | Record<string, any>) => void;
        setStorageEmailLink: (email: string) => void;
        removeStorageUser: () => void;
        removeStorageEmailLink: () => void;
    };
    common(options: IAuthOptions<K>): {
        log: {
            (message: string): void;
            <E extends Error>(error: E): void;
            (data: Record<string, any>): void;
            (type: "log" | "fatal" | "error" | "warn" | "info" | "debug", message: string): void;
            <E_1 extends Error>(type: "log" | "fatal" | "error" | "warn" | "info" | "debug", error: E_1): void;
            (type: "log" | "fatal" | "error" | "warn" | "info" | "debug", data: Record<string, any>): void;
        };
        providers: ProviderMap<K>;
        hasProvider: <U extends firebase.User>(user: U, ...providers: string[]) => boolean;
        signInProvider: <U_1 extends firebase.User>(user: U_1) => Promise<string | null>;
        getEnabledProviderIDs: () => string[];
        stringifyParams: (params: Record<string, any>) => string;
        hasAuthLink: () => any;
        updateProfile: (profile: {
            displayName?: string | undefined;
            photoURL?: string | undefined;
        }) => Promise<boolean>;
        ensureDisplayName: <U_2 extends firebase.UserInfo>(user: U_2) => U_2;
        mapUser: <U_3 extends Record<string, any>>(user: firebase.User | null, extend?: U_3) => (firebase.UserInfo & U_3) | null;
        hasStorageUser: () => boolean;
        hasStorageEmailLink: () => boolean;
        getStorageUser: <T extends firebase.UserInfo>(def?: T) => T;
        getStorageEmailLink: <T_1 extends string>(def?: T_1) => T_1;
        setStorageUser: (value: string | number | boolean | Date | Record<string, any>) => void;
        setStorageEmailLink: (email: string) => void;
        removeStorageUser: () => void;
        removeStorageEmailLink: () => void;
    };
    model(options: IAuthOptions<K>): {
        findById: (uid: string) => any;
        create: <T extends firebase.UserInfo>(user: T) => void;
        update: <T_1 extends Partial<firebase.UserInfo> & Record<string, any>>(user: T_1) => void;
        handleCredential: (userCredential: IAuthCredential, suppressPersist?: boolean) => Promise<firebase.User>;
    };
}
export declare type Firebase = typeof firebase;
export declare type AuthApi<K extends Provider> = ReturnType<TypeWrapper<K>['main']>;
export declare type AuthCommon<K extends Provider> = ReturnType<TypeWrapper<K>['common']>;
export declare type AuthModel<K extends Provider> = ReturnType<TypeWrapper<K>['model']>;
export interface Providers {
    google: firebase.auth.GoogleAuthProvider;
    facebook: firebase.auth.FacebookAuthProvider;
    github: firebase.auth.GithubAuthProvider;
    twitter: firebase.auth.TwitterAuthProvider;
    microsoft: firebase.auth.OAuthProvider;
    yahoo: firebase.auth.OAuthProvider;
    apple: firebase.auth.OAuthProvider;
    phone: firebase.auth.GoogleAuthProvider;
}
export declare type Provider = keyof Providers;
export declare type ProviderMap<K extends Provider> = {
    [P in K]: Providers[P];
};
export declare type ConfirmAuthCode = <U extends firebase.User>(code: string) => Promise<U>;
export interface IAuthCredential extends Omit<firebase.auth.UserCredential, 'credential'> {
    /**
     * Set credential to optional as we may not
     * have it if passing to user defined handler
     * on auth state changed.
     */
    credential?: firebase.auth.AuthCredential & {
        idToken?: string;
        accessToken?: string;
    };
}
interface AuthBaseOptions<K extends Provider> {
    firebase: any;
    enableWatchState?: boolean;
    userStorageKey?: string;
    emailStorageLinkKey?: string;
    emailVerificationUrl?: string;
    enabledProviders?: K[];
    collectionName?: string;
    databasePersist?: boolean;
    updateProps?: (keyof firebase.User | string)[];
    onAuthCredential?: (userCredential: IAuthCredential) => (firebase.UserInfo & Record<string, any>) | null;
    globalActionCodes?: firebase.auth.ActionCodeSettings;
}
export interface IAuthOptions<K extends Provider> extends AuthBaseOptions<K> {
    logger?: (payload: IAuthLogPayload) => void;
}
export interface IAuthInitOptions<K extends Provider> extends AuthBaseOptions<K> {
    firebase: typeof firebase;
    common: AuthCommon<K>;
    model: AuthModel<K>;
    enableLink?: boolean;
    enablePassword?: boolean;
}
export interface IAuthLogPayload {
    level: 'log' | 'fatal' | 'error' | 'warn' | 'info' | 'debug';
    message: string;
    timestamp?: number;
    stack?: string;
    code?: string;
    params?: Record<string, any>;
    [key: string]: any;
}
export interface IAuthIdentity<U extends firebase.UserInfo = firebase.UserInfo> {
    defaultUser: U;
}
export interface IRecaptchaOptions {
    size?: 'invisible' | 'normal';
    callback?: (response?: any) => void;
    'expired-callback'?: () => void;
}
export {};
//# sourceMappingURL=types.d.ts.map