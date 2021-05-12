import type firebase from 'firebase/app';
import { storage } from '../utils/storage';
import type { Provider, IAuthInitOptions, IAuthCredential } from '../types';

export function initPassword<K extends Provider>(options: IAuthInitOptions<K>) {

  const { userStorageKey, model, emailVerificationUrl, globalActionCodes, common, firebase: firebaseInstance } = options as Required<IAuthInitOptions<K>>;

  const { stringifyParams, updateProfile, log } = common;

  async function sendVerification(actionCodes?: firebase.auth.ActionCodeSettings) {

    actionCodes = { ...globalActionCodes, ...actionCodes };

    const currentUser = firebaseInstance.auth().currentUser;

    if (!currentUser)
      return false;

    try {
      await currentUser.sendEmailVerification(actionCodes);
      return true;
    }

    catch (err) {
      log(err);
      return Promise.reject(err);
    }

  }

  async function signUp(email: string, password: string, params?: Record<string, any>, actionCodes?: firebase.auth.ActionCodeSettings) {

    try {

      actionCodes = { ...globalActionCodes, ...actionCodes };

      if (!actionCodes.url) {

        let _url = emailVerificationUrl;

        // Add any supplied params.
        if (params)
          _url += '?' + stringifyParams(params);

        actionCodes.url = _url;

      }

      if (!actionCodes?.url)
        return false;

      const credential = await firebaseInstance
        .auth()
        .createUserWithEmailAndPassword(email, password);

      if (!credential.user)
        return false;

      // Send verification
      credential.user.sendEmailVerification(actionCodes);

      return true;

    }
    catch (err) {
      log(err);
      storage.remove(userStorageKey);
      return Promise.reject(err);
    }

  }

  async function signIn(email: string, password: string, params?: Record<string, any>, actionCodes?: firebase.auth.ActionCodeSettings) {

    try {

      const methods = await firebaseInstance.auth().fetchSignInMethodsForEmail(email);

      if (!methods.includes('password'))
        return signUp(email, password, params, actionCodes);

      const credential = await firebaseInstance
        .auth()
        .signInWithEmailAndPassword(email, password);

      if (!credential?.user?.emailVerified)
        throw new Error(`Email address ${email} has not be verified. Please verify or request reset.`);

      return model.handleCredential(credential as IAuthCredential);

    }

    catch (err) {
      log(err);
      storage.remove(userStorageKey);
      return Promise.reject(err);
    }

  }

  async function sendPasswordReset(email: string) {

    try {
      await firebaseInstance.auth().sendPasswordResetEmail(email);
      return true;
    }
    catch (err) {
      log(err);
      return Promise.reject(err);
    }

  }

  async function verifyPasswordReset(code: string) {

    try {
      const verifyResult = await firebaseInstance.auth().verifyPasswordResetCode(code);
      return verifyResult;
    }
    catch (err) {
      log(err);
      return Promise.reject(err);
    }

  }

  async function confirmPasswordReset(code: string, newPassword: string) {

    try {
      await firebaseInstance.auth().confirmPasswordReset(code, newPassword);
      return true;
    }
    catch (err) {
      log(err);
      return Promise.reject(err);
    }

  }

  async function updatePassword(newPassword: string) {

    try {

      const currentUser = firebaseInstance.auth().currentUser;

      if (!currentUser)
        throw new Error(`Cannot update password with user of undefined.`);

      await currentUser.updatePassword(newPassword);
      return true;

    }
    catch (err) {
      log(err);
      return Promise.reject(err);
    }

  }



  return {
    sendPasswordReset,
    confirmPasswordReset,
    verifyPasswordReset,
    updatePassword,
    sendVerification,
    updateProfile,
    signIn,
    signUp
  };

}