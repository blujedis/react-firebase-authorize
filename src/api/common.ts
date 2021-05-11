import type firebase from 'firebase/app';
import qs from 'query-string';
import { storage } from '../utils/storage';
import type { IAuthOptions, Provider } from '../types';

export type AuthCommon = ReturnType<typeof initCommon>;

let _utils: AuthCommon;

export function initCommon<K extends Provider>(options: IAuthOptions<K>) {

  const { firebase: firebaseInstance, userStorageKey, emailStorageLinkKey, isAuthenticatedKey } = options as Required<IAuthOptions<K>>;

  function stringifyParams(params: Record<string, any>) {
    return qs.stringify(params);
  }

  function hasAuthLink() {
    return firebaseInstance.auth().isSignInWithEmailLink(window.location.href);
  }

  async function updateProfile(profile: { displayName?: string, photoURL?: string }) {

    try {

      const currentUser = firebaseInstance.auth().currentUser;

      if (!currentUser)
        throw new Error(`Cannot update profile with user of undefined.`);

      await currentUser.updateProfile(profile);
      return true;

    }
    catch (err) {
      return Promise.reject(err);
    }

  }

  function ensureDisplayName<U extends firebase.UserInfo>(user: U) {
    if (user.displayName)
      return user;
    if (user.email) {
      let displayName = user.email.split('@')[0] as string;
      user.displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
    }
    return user;
  }

  function mapUser<U extends Record<string, any>>(
    user: firebase.User | null, extend: U = {} as U) {

    if (!user)
      return user;

    const usr = user as Required<firebase.UserInfo>;

    const infoKeys = [
      'displayName',
      'email',
      'phoneNumber',
      'photoURL',
      'providerId',
      'uid'
    ] as unknown as Extract<keyof U, string>[];

    let infoUser = infoKeys.reduce((a, k) => {
      if (typeof usr[k as keyof typeof usr] !== 'undefined')
        a[k] = usr[k as keyof typeof usr];
      return a;
    }, {} as any) as firebase.UserInfo;

    infoUser = ensureDisplayName(infoUser);

    return {
      ...infoUser,
      ...extend
    } as firebase.UserInfo & U;

  }

  const hasStorageUser = () => storage.has(userStorageKey);
  const hasStorageEmailLink = () => storage.has(emailStorageLinkKey);

  const getStorageUser = <T extends firebase.UserInfo>(def: T = null as any) => storage.get<T>(userStorageKey, def);
  const getStorageEmailLink = <T extends string>(def: T = null as any) => storage.get<T>(emailStorageLinkKey, def);

  const setStorageUser = (value: string | number | boolean | Date | Record<string, any>) => storage.set(userStorageKey, value);
  const setStorageEmailLink = (email: string) => storage.set(emailStorageLinkKey, email);

  const removeStorageUser = () => storage.remove(userStorageKey);
  const removeStorageEmailLink = () => storage.remove(emailStorageLinkKey);

  const isAuthenticated = () => {
    return storage.get<boolean>(isAuthenticatedKey) === true;
  };

  const setStorageAuthenticated = () => storage.set(isAuthenticatedKey, true);
  const removeStorageAuthenticated = () => storage.remove(isAuthenticatedKey);

  return {
    stringifyParams,
    hasAuthLink,
    updateProfile,
    ensureDisplayName,
    mapUser,
    isAuthenticated,
    hasStorageUser,
    hasStorageEmailLink,
    getStorageUser,
    getStorageEmailLink,
    setStorageUser,
    setStorageEmailLink,
    removeStorageUser,
    removeStorageEmailLink,
    setStorageAuthenticated,
    removeStorageAuthenticated
  };

}

export function createCommon<K extends Provider>(options: IAuthOptions<K>) {
  if (!_utils)
    _utils = initCommon(options);
  return _utils;
}