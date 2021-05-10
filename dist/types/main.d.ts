import firebase from 'firebase/app';
import { useRecaptcha } from './components/useRecaptcha';
import { hasAuthLink, ensureDisplayName, mapUser } from './utils/helpers';
import type { Provider, IAuthOptions } from './types';
export declare function initApi<K extends Provider>(options?: IAuthOptions<K>): {
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
        update: <T_1 extends Partial<firebase.UserInfo> & Record<string, any>>(user: T_1) => void;
        handleCredential: (userCredential: import("./types").IAuthCredential, suppressPersist?: boolean) => Promise<firebase.User>;
    };
    password: {
        sendPasswordReset: (email: string) => Promise<boolean>;
        confirmPasswordReset: (code: string, newPassword: string) => Promise<boolean>;
        verifyPasswordReset: (code: string) => Promise<string>;
        updatePassword: (newPassword: string) => Promise<boolean>;
        sendVerification: (actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
        updateProfile: typeof import("./utils/helpers").updateProfile;
        signIn: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
        signUp: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
    };
    phone: {
        signIn: (number: string, verifier: firebase.auth.RecaptchaVerifier) => Promise<(code: string) => Promise<firebase.User>>;
    };
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
    watchState: (handler?: ((user: firebase.User | null) => void) | undefined) => firebase.Unsubscribe;
    unsubscribeWatchState: firebase.Unsubscribe;
    signOut: (redirect?: string | (() => void) | undefined) => Promise<void>;
    hasAuthLink: typeof hasAuthLink;
    ensureDisplayName: typeof ensureDisplayName;
    mapUser: typeof mapUser;
    isAuthenticated: () => boolean;
    hasStorageUser: () => boolean;
    hasStorageEmailLink: () => boolean;
    getStorageUser: <T_2 extends firebase.UserInfo>(def?: T_2) => T_2;
    getStorageEmailLink: <T_3 extends string>(def?: T_3) => T_3;
    setStorageUser: (value: string | number | boolean | Date | Record<string, any>) => void;
    setStorageEmailLink: (email: string) => void;
    removeStorageUser: () => void;
    removeStorageEmailLink: () => void;
    setStorageAuthenticated: () => void;
    removeStorageAuthenticated: () => void;
};
/**
 * Initialize the firebase auth instance exposing methods
 * and helpers for signing into firebase.
 *
 * @param options IAuthOptions object.
 */
export declare function createAuth<K extends Provider>(options?: IAuthOptions<K>): {
    auth: {
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
            update: <T_1 extends Partial<firebase.UserInfo> & Record<string, any>>(user: T_1) => void;
            handleCredential: (userCredential: import("./types").IAuthCredential, suppressPersist?: boolean) => Promise<firebase.User>;
        };
        password: {
            sendPasswordReset: (email: string) => Promise<boolean>;
            confirmPasswordReset: (code: string, newPassword: string) => Promise<boolean>;
            verifyPasswordReset: (code: string) => Promise<string>;
            updatePassword: (newPassword: string) => Promise<boolean>;
            sendVerification: (actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
            updateProfile: typeof import("./utils/helpers").updateProfile;
            signIn: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
            signUp: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
        };
        phone: {
            signIn: (number: string, verifier: firebase.auth.RecaptchaVerifier) => Promise<(code: string) => Promise<firebase.User>>;
        };
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
        watchState: (handler?: ((user: firebase.User | null) => void) | undefined) => firebase.Unsubscribe;
        unsubscribeWatchState: firebase.Unsubscribe;
        signOut: (redirect?: string | (() => void) | undefined) => Promise<void>;
        hasAuthLink: typeof hasAuthLink;
        ensureDisplayName: typeof ensureDisplayName;
        mapUser: typeof mapUser;
        isAuthenticated: () => boolean;
        hasStorageUser: () => boolean;
        hasStorageEmailLink: () => boolean;
        getStorageUser: <T_2 extends firebase.UserInfo>(def?: T_2) => T_2;
        getStorageEmailLink: <T_3 extends string>(def?: T_3) => T_3;
        setStorageUser: (value: string | number | boolean | Record<string, any> | Date) => void;
        setStorageEmailLink: (email: string) => void;
        removeStorageUser: () => void;
        removeStorageEmailLink: () => void;
        setStorageAuthenticated: () => void;
        removeStorageAuthenticated: () => void;
    };
    useIdentity: <U extends firebase.UserInfo>(props?: import("./types").IAuthIdentity<U> | undefined) => {
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