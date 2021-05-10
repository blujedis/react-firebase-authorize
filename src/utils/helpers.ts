import firebase from 'firebase/app';
import qs from 'query-string';

export function stringifyParams(params: Record<string, any>) {
  return qs.stringify(params);
}

export function hasAuthLink() {
  return firebase.auth().isSignInWithEmailLink(window.location.href);
}

export function ensureDisplayName<U extends firebase.UserInfo>(user: U) {
  if (user.displayName)
    return user;
  if (user.email) {
    let displayName = user.email.split('@')[0] as string;
    user.displayName = displayName.charAt(0).toUpperCase() + displayName.slice(1);
  }
  return user;
}

/**
  * Converts an error to object literal.
  * 
  * @param err the error to convert to object
  */
export function serializeError<E extends Error>(err: E & { [key: string]: any }) {
  if (!(err instanceof Error))
    return {};
  const result = Object.getOwnPropertyNames(err).reduce((a, c) => {
    a[c as keyof E] = err[c];
    return a;
  }, {} as Record<keyof E, any>);
  if (err.name && !result.name)
    result.name = err.name;
  return result;
}

export function mapUser<U extends Record<string, any>>(
  user: firebase.User | null, extend: U = {} as U) {

  if (!user)
    return user;

  const usr = user as Required<firebase.UserInfo>;

  const infoKeys = [
    'displayName',
    'email',
    'phoneNumber',
    'photoURL',
    'providerId',
    'uid'
  ] as unknown as Extract<keyof U, string>[];

  let infoUser = infoKeys.reduce((a, k) => {
    if (typeof usr[k as keyof typeof usr] !== 'undefined')
      a[k] = usr[k as keyof typeof usr];
    return a;
  }, {} as any) as firebase.UserInfo;

  infoUser = ensureDisplayName(infoUser);

  return {
    ...infoUser,
    ...extend
  } as firebase.UserInfo & U;

}

export async function updateProfile(profile: { displayName?: string, photoURL?: string }) {

  try {

    const currentUser = firebase.auth().currentUser;

    if (!currentUser)
      throw new Error(`Cannot update profile with user of undefined.`);

    await currentUser.updateProfile(profile);
    return true;

  }
  catch (err) {
    return Promise.reject(err);
  }

}
