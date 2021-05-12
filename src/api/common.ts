import type firebase from 'firebase/app';
import qs from 'query-string';
import { storage } from '../utils/storage';
import type { IAuthLogPayload, IAuthOptions, Provider, ProviderMap, AuthCommon } from '../types';
import { createLogger } from '../utils/logger';

let _utils: AuthCommon<any>;

export function initCommon<K extends Provider>(options: IAuthOptions<K>) {

  const { firebase: firebaseInstance, logger, enabledProviders, userStorageKey, emailStorageLinkKey } = options as Required<IAuthOptions<K>>;

  const log = createLogger(logger as ((payload: IAuthLogPayload) => void));
  const providers = {} as ProviderMap<K>;

  const PROVIDERS_MAP = {
    google: () => new firebaseInstance.auth.GoogleAuthProvider(),
    facebook: () => new firebaseInstance.auth.FacebookAuthProvider(),
    github: () => new firebaseInstance.auth.GithubAuthProvider(),
    twitter: () => new firebaseInstance.auth.TwitterAuthProvider(),
    microsoft: () => new firebaseInstance.auth.OAuthProvider('microsoft.com'),
    yahoo: () => new firebaseInstance.auth.OAuthProvider('yahoo.com'),
    apple: () => new firebaseInstance.auth.OAuthProvider('apple.com'),
    phone: () => new firebaseInstance.auth.PhoneAuthProvider()
  };

  enabledProviders.forEach(k => {
    if (typeof PROVIDERS_MAP[k] !== 'undefined') {
      providers[k] = PROVIDERS_MAP[k]() as any;
    }
    else {
      log({ level: 'warn', message: `Provider ${k} is not in known providers [${Object.keys(PROVIDERS_MAP).join(', ')}]` });
    }
  });

  /**
   * Gets the ids of all enabled providers.
   */
  function getEnabledProviderIDs() {
    return Object.keys(providers).map(k => {
      return providers[k as keyof typeof providers].providerId;
    });
  }

  async function signInProvider<U extends firebase.User>(user: U) {
    const tokenResult = await user.getIdTokenResult();
    return tokenResult.signInProvider;
  }

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

  function hasProvider<U extends firebase.User>(user: U, ...providers: string[]) {
    const arr = user?.providerData || [];
    return providers.some(v => {
      return !!arr.find(p => p?.providerId === v);
    });
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

  return {
    log,
    providers,
    hasProvider,
    signInProvider,
    getEnabledProviderIDs,
    stringifyParams,
    hasAuthLink,
    updateProfile,
    ensureDisplayName,
    mapUser,
    hasStorageUser,
    hasStorageEmailLink,
    getStorageUser,
    getStorageEmailLink,
    setStorageUser,
    setStorageEmailLink,
    removeStorageUser,
    removeStorageEmailLink
  };

}

export function createCommon<K extends Provider>(options: IAuthOptions<K>) {
  if (!_utils)
    _utils = initCommon<K>(options);
  return _utils as AuthCommon<K>;
}