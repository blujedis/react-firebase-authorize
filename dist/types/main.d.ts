import type firebase from 'firebase/app';
import { useRecaptcha } from './components/useRecaptcha';
import type { Provider, IAuthOptions, IAuthCredential } from './types';
export declare function initApi<K extends Provider>(options: IAuthOptions<K>): {
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
        findById: (uid: string) => Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>;
        create: <T extends firebase.UserInfo>(user: T) => void;
        update: <T_1 extends Partial<firebase.UserInfo> & Record<string, any>>(user: T_1) => void; /**
         * Signs the user out of Firebase and optionally redirects.
         * Redirect uses window.location, for async handle after promise is resolved.
         *
         * @param redirect a path to redirect to or callback function.
         */
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
    providers: import("./types").ProviderMap<K>;
    provider: {
        providers: import("./types").ProviderMap<K>;
        link: {
            (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
            (provider: firebase.auth.AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
        };
        signIn: {
            (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
            (provider: firebase.auth.AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
        };
    };
    watchState: (handler?: ((user: firebase.User | null) => void) | undefined, signOutRedirect?: string | (() => void) | undefined) => firebase.Unsubscribe;
    unsubscribeWatchState: firebase.Unsubscribe;
    signOut: (redirect?: string | (() => void) | undefined) => Promise<void>;
    hasAuthLink: () => boolean;
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
/**
 * Initialize the firebase auth instance exposing methods
 * and helpers for signing into firebase.
 *
 * @param options IAuthOptions object.
 */
export declare function createAuth<K extends Provider>(options: IAuthOptions<K>): {
    api: {
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
            findById: (uid: string) => Promise<firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData>>;
            create: <T extends firebase.UserInfo>(user: T) => void;
            update: <T_1 extends Partial<firebase.UserInfo> & Record<string, any>>(user: T_1) => void; /**
             * Signs the user out of Firebase and optionally redirects.
             * Redirect uses window.location, for async handle after promise is resolved.
             *
             * @param redirect a path to redirect to or callback function.
             */
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
        providers: import("./types").ProviderMap<K>;
        provider: {
            providers: import("./types").ProviderMap<K>;
            link: {
                (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
                (provider: firebase.auth.AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
            };
            signIn: {
                (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
                (provider: firebase.auth.AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
            };
        };
        watchState: (handler?: ((user: firebase.User | null) => void) | undefined, signOutRedirect?: string | (() => void) | undefined) => firebase.Unsubscribe;
        unsubscribeWatchState: firebase.Unsubscribe;
        signOut: (redirect?: string | (() => void) | undefined) => Promise<void>;
        hasAuthLink: () => boolean;
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
    useIdentity: <U_3 extends firebase.UserInfo>(props?: import("./types").IAuthIdentity<U_3> | undefined) => {
        readonly defaultUser: {
            displayName: string;
            photoURL: string;
            email: string;
            uid: string;
        };
        readonly hasUser: boolean;
        readonly user: U_3;
        readonly emailLink: string;
        readonly avatar: string;
        readonly hasAuthLink: boolean;
        providers: import("./types").ProviderMap<K>;
        signInByLink: (email: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
        signInByProvider: {
            (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
            (provider: firebase.auth.AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
        };
        signInByPassword: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
        signInByPhone: (number: string, verifier: firebase.auth.RecaptchaVerifier) => Promise<(code: string) => Promise<firebase.User>>;
        signOut: (redirect?: string | (() => void) | undefined) => Promise<void>;
    };
    useRecaptcha: typeof useRecaptcha;
};
//# sourceMappingURL=main.d.ts.map