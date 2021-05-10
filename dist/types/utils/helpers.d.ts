import firebase from 'firebase/app';
export declare function stringifyParams(params: Record<string, any>): string;
export declare function hasAuthLink(): boolean;
export declare function ensureDisplayName<U extends firebase.UserInfo>(user: U): U;
/**
  * Converts an error to object literal.
  *
  * @param err the error to convert to object
  */
export declare function serializeError<E extends Error>(err: E & {
    [key: string]: any;
}): {};
export declare function mapUser<U extends Record<string, any>>(user: firebase.User | null, extend?: U): (firebase.UserInfo & U) | null;
export declare function updateProfile(profile: {
    displayName?: string;
    photoURL?: string;
}): Promise<boolean>;
//# sourceMappingURL=helpers.d.ts.map