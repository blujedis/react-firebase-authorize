import firebase from 'firebase/app';
import { initLink } from './api/link';
import { initPassword } from './api/password';
import { initProvider } from './api/provider';
import { initPhone } from './api/phone';
import { createLogger } from './utils/logger';
import { createModel } from './api/model';
import { createUseIdentity } from './components/useIdentity';
import { useRecaptcha } from './components/useRecaptcha';
import { hasAuthLink, ensureDisplayName, mapUser } from './utils/helpers';
import { storage } from './utils/storage';
import type { Provider, IAuthOptions, IAuthInitOptions, IAuthLogPayload } from './types';
import { AUTH_DEFAULTS } from './constants';

export function initApi<K extends Provider>(options?: IAuthOptions<K>) {

  options = {
    ...AUTH_DEFAULTS,
    ...options
  };

  const { logger, ...rest } = options;
  const { userStorageKey, emailStorageLinkKey, isAuthenticatedKey, onAuthCredential, enableWatchState } = options as Required<IAuthOptions<K>>;

  const initOptions = rest as Required<IAuthInitOptions<K>>;
  const log = createLogger(logger as ((payload: IAuthLogPayload) => void));
  const model = createModel(options);

  initOptions.log = log;
  initOptions.model = model;

  // Create storage helpers.

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

  // Init SignIn Providers.

  const link = initLink<K>(initOptions);
  const password = initPassword<K>(initOptions);
  const phone = initPhone<K>(initOptions);
  const provider = initProvider<K>(initOptions);

  // Init SignOut and Auth State Helpers.

  /**
   * Signs the user out of Firebase and optionally redirects.
   * Redirect uses window.location, for async handle after promise is resolved.
   * 
   * @param redirect a path to redirect to or callback function.
   */
  function signOut(redirect?: string | (() => void)) {
    return firebase.auth().signOut().then(() => {
      storage.remove(userStorageKey);
      if (redirect) {
        if (typeof redirect === 'string' && typeof window !== 'undefined')
          window.location.href = redirect;
        else
          (redirect as any)();
      }
    });
  };

  /**
   * Convenience method that toggles a localStorage state indicated
   * whether or not the user is authenticated or not.
   * 
   * @param handler optional on change handler to call on state changed.
   */
  function watchState(handler?: (user: firebase.User | null) => void) {

    // signOutRedirect?: string | (() => void)

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {

      if (handler)
        return handler(user);

      if (!user) {
        removeStorageUser();
        removeStorageAuthenticated();
      }

      // else if (user && user.emailVerified === false) {
      //   removeStorageUser();
      //   removeStorageAuthenticated();
      //   signOut(signOutRedirect);
      // }

      else {

        // If we have a firebase user but our
        // storage key is null update with the user.
        // NOTE: you cannot get a social provider
        // accessToken here, you'd have to re-auth.
        if (!hasStorageUser()) {
          const usr = onAuthCredential({ user });
          if (usr)
            setStorageUser(usr);
        }

        setStorageAuthenticated();

      }

    });

    return unsubscribe;

  };

  const unsubscribeWatchState: firebase.Unsubscribe = enableWatchState ? watchState : null as any;

  return {
    options,
    log,
    link,
    model,
    password,
    phone,
    provider,
    watchState,
    unsubscribeWatchState,
    signOut,
    hasAuthLink,
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

/**
 * Initialize the firebase auth instance exposing methods
 * and helpers for signing into firebase.
 * 
 * @param options IAuthOptions object.
 */
export function createAuth<K extends Provider>(options?: IAuthOptions<K>) {

  const auth = initApi<K>(options);
  const useIdentity = createUseIdentity<K>(auth);

  return {
    auth,
    useIdentity,
    useRecaptcha
  };

}