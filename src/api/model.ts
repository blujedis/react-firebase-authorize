import firebase from 'firebase/app';

import type { IAuthCredential, IAuthOptions, Provider } from '../types';

export type AuthModel = ReturnType<typeof initModel>;

let _model: ReturnType<typeof initModel>;

function initModel<K extends Provider>(options: IAuthOptions<K>) {

  const { collectionName, updateProps, onAuthCredential, databasePersist } = options as Required<IAuthOptions<K>>;

  function getRef() {
    return firebase.firestore().collection(collectionName);
  }

  /**
   * Handles the login credential, normalizes and persists to database if enabled.
   * Suppress may be called by callee preventing update such as an unverified user/email.
   * 
   * @param userCredential the firebase credential upon sign in.
   * @param suppressPersist when true prevent database persistence.
   */
  async function handleCredential(userCredential: IAuthCredential, suppressPersist = false): Promise<firebase.User> {

    const user = userCredential.user as firebase.User;

    let dbUser = user as firebase.UserInfo;
    const isNew = userCredential?.additionalUserInfo?.isNewUser;

    if (onAuthCredential)
      dbUser = await onAuthCredential(userCredential) as firebase.UserInfo;

    // Check if user wants data persisted to the database.
    // When suppress is true requesting only that the user
    // object be normalized but not persisted to db.
    if (databasePersist && !suppressPersist) {
      if (isNew)
        await create(dbUser);
      else
        await update(dbUser);
    }

    return user;

  }

  function findById(uid: string) {
    return getRef().doc(uid).get();
  }

  function create<T extends firebase.UserInfo>(user: T) {

    if (!user.uid)
      throw new Error(`Failed to create user with "uid" of undefined.`);

    getRef().doc(user.uid).set(user);

  }

  function update<T extends Partial<firebase.UserInfo> & Record<string, any>>(user: T) {

    if (!user.uid)
      throw new Error(`Failed to update user with "uid" of undefined.`);

    if (!updateProps.length)
      return;

    const obj = updateProps.reduce((a, key) => {
      if (typeof user[key] !== 'undefined')
        a[key] = user[key];
      return key;
    }, {} as any);

    getRef().doc(user.uid).update(obj);

  }

  return {
    findById,
    create,
    update,
    handleCredential
  };

}

export function createModel<K extends Provider>(options: IAuthOptions<K>) {
  if (!_model)
    _model = initModel(options);
  return _model;
}

