import type firebase from 'firebase/app';
import type { IAuthOptions, Provider, ProviderMap } from '../types';
export declare function initCommon<K extends Provider>(options: IAuthOptions<K>): {
    log: {
        (message: string): void;
        <E extends Error>(error: E): void;
        (data: Record<string, any>): void;
        (type: "warn" | "log" | "fatal" | "error" | "info" | "debug", message: string): void;
        <E_1 extends Error>(type: "warn" | "log" | "fatal" | "error" | "info" | "debug", error: E_1): void;
        (type: "warn" | "log" | "fatal" | "error" | "info" | "debug", data: Record<string, any>): void;
    };
    providers: ProviderMap<K>;
    hasProvider: <U extends firebase.User>(user: U, ...providers: string[]) => boolean;
    signInProvider: <U_1 extends firebase.User>(user: U_1) => Promise<string | null>;
    getEnabledProviderIDs: () => string[];
    stringifyParams: (params: Record<string, any>) => string;
    hasAuthLink: () => any;
    updateProfile: (profile: {
        displayName?: string;
        photoURL?: string;
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
export declare function createCommon<K extends Provider>(options: IAuthOptions<K>): {
    log: {
        (message: string): void;
        <E extends Error>(error: E): void;
        (data: Record<string, any>): void;
        (type: "warn" | "log" | "fatal" | "error" | "info" | "debug", message: string): void;
        <E_1 extends Error>(type: "warn" | "log" | "fatal" | "error" | "info" | "debug", error: E_1): void;
        (type: "warn" | "log" | "fatal" | "error" | "info" | "debug", data: Record<string, any>): void;
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
//# sourceMappingURL=common.d.ts.map