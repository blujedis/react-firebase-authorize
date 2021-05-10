import firebase from 'firebase/app';
import type { Provider, IAuthInitOptions, IAuthCredential } from '../types';
import { storage } from '../utils/storage';

export function initLink<K extends Provider>(options: IAuthInitOptions<K>) {

  const { emailVerificationUrl, emailStorageLinkKey, log, model, globalActionCodes, common } = options as Required<IAuthInitOptions<K>>;

  const { stringifyParams, hasAuthLink} = common;

  async function signUp(email: string, params?: Record<string, any>, actionCodes?: firebase.auth.ActionCodeSettings): Promise<boolean> {

    try {

      actionCodes = { ...globalActionCodes, ...actionCodes } as firebase.auth.ActionCodeSettings;

      // example development: `http://127.0.0.1:3000/signin`
      // example production: `https://domain.com/signin`

      if (!actionCodes.url) {

        let _url = emailVerificationUrl;

        // Add any supplied params.
        if (params)
          _url += '?' + stringifyParams(params);

        actionCodes.url = _url;

      }

      if (!actionCodes?.url)
        return false;

      await firebase
        .auth()
        .sendSignInLinkToEmail(email, actionCodes)
        .then(_ => {
          storage.set(emailStorageLinkKey, email);
        });

      return true;

    }

    catch (err) {
      log(err);
      return Promise.reject(err);
    }

  }

  async function signIn(email: string, params?: Record<string, any>, actionCodes?: firebase.auth.ActionCodeSettings) {

    try {

      const isAuthLink = hasAuthLink();

      if (!isAuthLink)
        return signUp(email, params, actionCodes);

      storage.remove(emailStorageLinkKey);

      const credential = await firebase.auth()
        .signInWithEmailLink(email, window.location.href);

      return model.handleCredential(credential as IAuthCredential);

    }
    catch (err) {
      log(err);
      return Promise.reject(err);
    }

  }

  return {
    signUp,
    signIn
  };

}


