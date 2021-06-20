import type firebase from 'firebase/app';
import { initLink } from './api/link';
import { initPassword } from './api/password';
import { initProvider } from './api/provider';
import { initPhone } from './api/phone';
import { createModel } from './api/model';
import { createUseIdentity } from './components/useIdentity';
import { useRecaptcha } from './components/useRecaptcha';
import type { Provider, IAuthOptions, IAuthInitOptions, IAuthCredential } from './types';
import { AUTH_DEFAULTS } from './constants';
import { createCommon } from './api/common';

export function initApi<K extends Provider>(options: IAuthOptions<K>) {

  options = {
    ...AUTH_DEFAULTS,
    ...options
  };

  // Destructure logger so we can init/pass in initOptions.
  const { logger, ...rest } = options;

  const { enableWatchState, firebase: firebaseInstance } = options as Required<IAuthOptions<K>>;

  // Initialize helpers/utils

  const initOptions = rest as Required<IAuthInitOptions<K>>;

  // Create common helpers/utils.
  const common = createCommon(options);

  const {
    log,
    hasProvider,
    providers,
    hasAuthLink,
    signInProvider,
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
      removeStorageUser();
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
  function watchState(handler?: (user: firebase.User | null) => void, signOutRedirect?: string | (() => void)) {

    const unsubscribe = firebaseInstance.auth().onAuthStateChanged(async (user: any) => {

      if (handler)
        return handler(user);

      if (!user) {
        removeStorageUser();
      }

      else {

        if (user.emailVerified === false) {
          // Shouldn't really ever hit this but just in case.
          // NOTE: checking for provider as "phone" always has
          // email verified of false.
          const providerId = await signInProvider(user);
          if (providerId === 'password')  {
            removeStorageUser();
            signOut(signOutRedirect);
            return;
          }
        }

        // If we have a firebase user but our
        // storage key is null update with the user.
        // NOTE: you cannot get a social provider
        // accessToken here, you'd have to re-auth.
        if (!hasStorageUser()) {
          const usr = initOptions.onAuthCredential({ user });
          if (usr)
            setStorageUser(usr);
        }

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
    providers,
    provider,
    watchState,
    unsubscribeWatchState,
    signOut,
    hasAuthLink,
    hasProvider,
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

/**
 * Initialize the firebase auth instance exposing methods
 * and helpers for signing into firebase.
 * 
 * @param options IAuthOptions object.
 */
export function createAuth<K extends Provider>(options: IAuthOptions<K>) {

  const api = initApi<K>(options);
  const useIdentity = createUseIdentity<K>(api);

  return {
    api,
    useIdentity,
    useRecaptcha
  };

}