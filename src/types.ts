import type firebase from 'firebase/app';
import { initCommon } from './api/common';
import { initModel } from './api/model';
import { initApi } from './main';

// Simple hack to ensure proper
// types, temp until move to classes.
class TypeWrapper<K extends Provider> {
  main(options: IAuthOptions<K>) {
    return initApi<K>(options);
  }
  common(options: IAuthOptions<K>) {
    return initCommon<K>(options);
  }
  model(options: IAuthOptions<K>) {
    return initModel<K>(options);
  }
}

export type Firebase = typeof firebase;

export type AuthApi<K extends Provider> = ReturnType<TypeWrapper<K>['main']>;

export type AuthCommon<K extends Provider> = ReturnType<TypeWrapper<K>['common']>;

export type AuthModel<K extends Provider> = ReturnType<TypeWrapper<K>['model']>;

export interface Providers {
  google: firebase.auth.GoogleAuthProvider,
  facebook: firebase.auth.FacebookAuthProvider,
  github: firebase.auth.GithubAuthProvider,
  twitter: firebase.auth.TwitterAuthProvider,
  microsoft: firebase.auth.OAuthProvider,
  yahoo: firebase.auth.OAuthProvider,
  apple: firebase.auth.OAuthProvider,
  phone: firebase.auth.GoogleAuthProvider
}

export type Provider = keyof Providers;

export type ProviderMap<K extends Provider> = { [P in K]: Providers[P]; };

export type ConfirmAuthCode = <U extends firebase.User>(code: string) => Promise<U>;

export interface IAuthCredential extends Omit<firebase.auth.UserCredential, 'credential'> {
  /**
   * Set credential to optional as we may not 
   * have it if passing to user defined handler
   * on auth state changed.
   */
  credential?: firebase.auth.AuthCredential & { idToken?: string, accessToken?: string; };
}

interface AuthBaseOptions<K extends Provider> {
  firebase: Firebase;
  enableWatchState?: boolean;
  userStorageKey?: string;
  emailStorageLinkKey?: string;
  emailVerificationUrl?: string;
  enabledProviders?: K[];
  collectionName?: string;
  databasePersist?: boolean;
  updateProps?: (keyof firebase.User | string)[];
  onAuthCredential?: (userCredential: IAuthCredential) => (firebase.UserInfo & Record<string, any>) | null;
  globalActionCodes?: firebase.auth.ActionCodeSettings;
}

export interface IAuthOptions<K extends Provider> extends AuthBaseOptions<K> {
  logger?: (payload: IAuthLogPayload) => void;
}

export interface IAuthInitOptions<K extends Provider> extends AuthBaseOptions<K> {
  common: AuthCommon<K>;
  model: AuthModel<K>;
  enableLink?: boolean;
  enablePassword?: boolean;
}

export interface IAuthLogPayload {
  level: 'log' | 'fatal' | 'error' | 'warn' | 'info' | 'debug';
  message: string;
  timestamp?: number;
  stack?: string;
  code?: string;
  params?: Record<string, any>;
  [key: string]: any;
}

export interface IAuthIdentity<U extends firebase.UserInfo = firebase.UserInfo> {
  defaultUser: U;
}

export interface IRecaptchaOptions {
  size?: 'invisible' | 'normal';
  callback?: (response?: any) => void;
  'expired-callback'?: () => void;
}