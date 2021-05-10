import type firebase from 'firebase/app';
import type { IAuthOptions, Provider } from '../types';
export declare type AuthCommon = ReturnType<typeof initCommon>;
export declare function initCommon<K extends Provider>(options: IAuthOptions<K>): {
    stringifyParams: (params: Record<string, any>) => string;
    hasAuthLink: () => boolean;
    updateProfile: (profile: {
        displayName?: string;
        photoURL?: string;
    }) => Promise<boolean>;
    ensureDisplayName: <U extends firebase.UserInfo>(user: U) => U;
    mapUser: <U_1 extends Record<string, any>>(user: firebase.User | null, extend?: U_1) => (firebase.UserInfo & U_1) | null;
    isAuthenticated: () => boolean;
    hasStorageUser: () => boolean;
    hasStorageEmailLink: () => boolean;
    getStorageUser: <T extends firebase.UserInfo>(def?: T) => T;
    getStorageEmailLink: <T_1 extends string>(def?: T_1) => T_1;
    setStorageUser: (value: string | number | boolean | Date | Record<string, any>) => void;
    setStorageEmailLink: (email: string) => void;
    removeStorageUser: () => void;
    removeStorageEmailLink: () => void;
    setStorageAuthenticated: () => void;
    removeStorageAuthenticated: () => void;
};
export declare function createCommon<K extends Provider>(options: IAuthOptions<K>): {
    stringifyParams: (params: Record<string, any>) => string;
    hasAuthLink: () => boolean;
    updateProfile: (profile: {
        displayName?: string | undefined;
        photoURL?: string | undefined;
    }) => Promise<boolean>;
    ensureDisplayName: <U extends firebase.UserInfo>(user: U) => U;
    mapUser: <U_1 extends Record<string, any>>(user: firebase.User | null, extend?: U_1) => (firebase.UserInfo & U_1) | null;
    isAuthenticated: () => boolean;
    hasStorageUser: () => boolean;
    hasStorageEmailLink: () => boolean;
    getStorageUser: <T extends firebase.UserInfo>(def?: T) => T;
    getStorageEmailLink: <T_1 extends string>(def?: T_1) => T_1;
    setStorageUser: (value: string | number | boolean | Date | Record<string, any>) => void;
    setStorageEmailLink: (email: string) => void;
    removeStorageUser: () => void;
    removeStorageEmailLink: () => void;
    setStorageAuthenticated: () => void;
    removeStorageAuthenticated: () => void;
};
//# sourceMappingURL=common.d.ts.map