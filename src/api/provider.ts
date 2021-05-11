import type firebase from 'firebase/app';
import { storage } from '../utils/storage';
import type { Provider, IAuthInitOptions, ProviderMap, IAuthCredential, Providers } from '../types';

type AuthProvider = firebase.auth.AuthProvider;

export function initProvider<K extends Provider>(options: IAuthInitOptions<K>) {

  const { userStorageKey, log, model, enabledProviders, firebase: firebaseInstance } = options as Required<IAuthInitOptions<K>>;

  const providers = {} as ProviderMap<K>;

  const PROVIDERS = {
    google: () => new firebaseInstance.auth.GoogleAuthProvider(),
    facebook: () => new  firebaseInstance.auth.FacebookAuthProvider(),
    github: () => new firebaseInstance.auth.GithubAuthProvider(),
    twitter: () => new firebaseInstance.auth.TwitterAuthProvider(),
    microsoft: () => new firebaseInstance.auth.OAuthProvider('microsoft.com'),
    yahoo: () => new firebaseInstance.auth.OAuthProvider('yahoo.com'),
    apple: () => new firebaseInstance.auth.OAuthProvider('apple.com'),
    phone: () => new firebaseInstance.auth.PhoneAuthProvider()
  };

  enabledProviders.forEach(k => {
    if (typeof PROVIDERS[k] !== 'undefined') {
      providers[k] = PROVIDERS[k]() as Providers[K];
    }
    else {
      log({ level: 'warn', message: `Provider ${k} is not in known providers [${Object.keys(PROVIDERS).join(', ')}]` });
    }
  });

  function getProvider(providerId: K) {
    const provider = providers[providerId];
    if (!provider || !enabledProviders.includes(providerId))
      throw new Error(`Cannot signIn using unknown or disabled provider ${providerId}.`);
    return provider;
  }

  async function signIn(providerId: K, withRedirect?: boolean): Promise<firebase.User>

  async function signIn(provider: AuthProvider, withRedirect?: boolean): Promise<firebase.User>

  async function signIn(providerId: K | AuthProvider, withRedirect?: boolean): Promise<firebase.User> {

    if (withRedirect)
      console.log(withRedirect);

    try {

      const provider = typeof providerId === 'string' ? getProvider(providerId) : providerId;

      const credential = await firebaseInstance
        .auth()
        .signInWithPopup(provider);

      return model.handleCredential(credential as IAuthCredential);

    }
    catch (err) {
      log(err);
      storage.remove(userStorageKey);
      return Promise.reject(err);
    }

  }

  async function link(providerId: K, withRedirect?: boolean): Promise<firebase.User>;

  async function link(provider: AuthProvider, withRedirect?: boolean): Promise<firebase.User>;

  async function link(providerId: K | AuthProvider): Promise<firebase.User> {

    try {

      const provider = typeof providerId === 'string' ? getProvider(providerId) : providerId;

      const currentUser = await firebaseInstance.auth().currentUser;

      if (!currentUser)
        throw new Error(`Failed to link ${provider.providerId} using user of undefined.`);

      const credential = await currentUser.linkWithPopup(provider);

      return model.handleCredential(credential as IAuthCredential, true);

    }
    catch (err) {
      log(err);
      return Promise.reject(err);
    }

  }

  return {
    providers,
    link,
    signIn
  };

}