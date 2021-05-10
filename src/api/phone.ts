import firebase from 'firebase/app';
import type { Provider, IAuthInitOptions, IAuthCredential } from '../types';
import { storage } from '../utils/storage';

export function initPhone<K extends Provider>(options: IAuthInitOptions<K>) {

  const { userStorageKey, log, model } = options as Required<IAuthInitOptions<K>>;

  async function signIn(number: string, verifier: firebase.auth.RecaptchaVerifier) {

    try {

      const instance = await firebase
        .auth()
        .signInWithPhoneNumber(number, verifier);

      const handleConfirm = async (code: string): Promise<firebase.User> => {
        const credential = await instance.confirm(code);
        return model.handleCredential(credential as IAuthCredential);
      };

      return handleConfirm;

    }
    catch (err) {
      log(err);
      storage.remove(userStorageKey);
      return Promise.reject(err);
    }

  }

  return {
    signIn
  };

}