import type firebase from 'firebase/app';
import { initLink } from './api/link';
import { initPassword } from './api/password';
import { initProvider } from './api/provider';
import { initPhone } from './api/phone';
import { createLogger } from './utils/logger';
import { createModel } from './api/model';
import { createUseIdentity } from './components/useIdentity';
import { useRecaptcha } from './components/useRecaptcha';
import { storage } from './utils/storage';
import type { Provider, IAuthOptions, IAuthInitOptions, IAuthLogPayload, IAuthCredential } from './types';
import { AUTH_DEFAULTS } from './constants';
import { createCommon } from './api/common';

export function initApi<K extends Provider>(options?: IAuthOptions<K>) {

  options = {
    ...AUTH_DEFAULTS,
    ...options
  };

  const { logger, ...rest } = options;
  const { userStorageKey, enableWatchState, firebase: firebaseInstance } = options as Required<IAuthOptions<K>>;

  // Initialize helpers/utils

  const initOptions = rest as Required<IAuthInitOptions<K>>;
  const log = createLogger(logger as ((payload: IAuthLogPayload) => void));
  const common = createCommon(options);

  const {
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
  } = common;

  options.onAuthCredential = options.onAuthCredential || ((userCredential: IAuthCredential) => {
    const user = userCredential.user;
    const extend = {
      idToken: (userCredential as any).credential?.idToken,
      accessToken: (userCredential as any).credential?.accessToken
    };
    return mapUser(user, extend);
  });
  initOptions.onAuthCredential = options.onAuthCredential;

  // onAuthCredential must be init before passing to model.
  const model = createModel(options);

  // Pass instances to internal initOptions. 
  initOptions.model = model;
  initOptions.log = log;
  initOptions.common = common;

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
    return firebaseInstance.auth().signOut().then(() => {
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

    const unsubscribe = firebaseInstance.auth().onAuthStateChanged((user) => {

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
          const usr = initOptions.onAuthCredential({ user });
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