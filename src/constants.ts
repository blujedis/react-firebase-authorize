import firebase from 'firebase/app';
import type { IAuthOptions, IAuthLogPayload } from './types';

export const IS_DEV = process.env.NODE_ENV !== 'production';

export const ACTION_CODES: firebase.auth.ActionCodeSettings = {
  // we don't set so that we can easily pass
  // params and build from "emailVerificationUrl"
  // for convenience. 
  url: '',
  handleCodeInApp: true
};

export const AUTH_DEFAULTS: IAuthOptions<any> = {
  firebase: null as any,
  enableWatchState: true,
  isAuthenticatedKey: 'isAuthenticated',
  userStorageKey: 'user',
  emailStorageLinkKey: 'emailLinkSignIn',
  enabledProviders: [],
  emailVerificationUrl: '',
  collectionName: 'user',
  databasePersist: false,
  logger: ({ timestamp, level, message }: IAuthLogPayload) => console.log(`[${timestamp}]:${level}`, message),
  globalActionCodes: { ...ACTION_CODES }
};

export const PROVIDERS = {
  google: () => new firebase.auth.GoogleAuthProvider(),
  facebook: () => new firebase.auth.FacebookAuthProvider(),
  github: () => new firebase.auth.GithubAuthProvider(),
  twitter: () => new firebase.auth.TwitterAuthProvider(),
  microsoft: () => new firebase.auth.OAuthProvider('microsoft.com'),
  yahoo: () => new firebase.auth.OAuthProvider('yahoo.com'),
  apple: () => new firebase.auth.OAuthProvider('apple.com'),
  phone: (auth?: firebase.auth.Auth) => new firebase.auth.PhoneAuthProvider(auth)
};