import type firebase from 'firebase/app';
import { initCommon } from './api/common';
import type { AuthModel } from './api/model';
import type { initProvider } from './api/provider';
import type { PROVIDERS } from './constants';
import { initApi } from './main';
import type { AuthCommon } from './api/common';

// Simple hack to ensure proper
// enabled providers.
class TypeWrapper<K extends Provider> {
  main(options: IAuthOptions<K>) {
    return initApi<K>(options);
  }
  utils(options: IAuthInitOptions<K>) {
    return initCommon<K>(options);
  }
}

export type Firebase = typeof firebase;

export type AuthApi<K extends Provider> = ReturnType<TypeWrapper<K>['main']>;
export type AuthUtils<K extends Provider> = ReturnType<TypeWrapper<K>['utils']>;

export type Providers = typeof PROVIDERS;
export type Provider = keyof Providers;
export type ProviderMap<K extends Provider> = { [P in K]: ReturnType<Providers[K]>; };
export type ProviderInstance<K extends Provider> = ReturnType<typeof initProvider> & {
  providers: ProviderMap<K>;
}

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
  isAuthenticatedKey?: string;
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
  log: (payload: IAuthLogPayload) => void;
  model: AuthModel;
  common: AuthCommon;
}

export interface IAuthLogPayload {
  level: 'log' | 'fatal' | 'error' | 'warn' | 'info' | 'debug';
  message: string;
  timestamp: number;
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