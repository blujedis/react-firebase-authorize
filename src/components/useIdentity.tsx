import type firebase from 'firebase/app';
import md5 from 'md5';
import type { AuthApi, Provider, IAuthIdentity } from '../types';

/**
 * Please update the "photoURL" with your own
 * locally hosted icon, this is only used as
 * an initial example.
 */
const IDENTITY_DEFAULTS = {
  defaultUser: {
    displayName: 'Guest',
    photoURL: 'https://cdn0.iconfinder.com/data/icons/communication-line-10/24/account_profile_user_contact_person_avatar_placeholder-512.png',
    email: '',
    uid: '-1',
  }
}

export function createUseIdentity<K extends Provider>(api: AuthApi<K>) {

  const useIdentity = <U extends firebase.UserInfo>(props?: IAuthIdentity<U>) => {

    props = {
      ...IDENTITY_DEFAULTS,
      ...props
    } as Required<IAuthIdentity<U>>;

    const { defaultUser } = props;
    const signInByLink = api.link.signIn;
    const signInByProvider = api.provider.signIn;
    const signInByPassword = api.password.signIn;
    const signInByPhone = api.phone.signIn;
    const user = ensureUser();

    function ensureUser() {
      const user = api.getStorageUser<U>(defaultUser);
      if (!user.displayName && user.providerId === 'firebase')
        user.displayName = user.phoneNumber;
      user.photoURL = user.photoURL || defaultUser.photoURL;
      return user;
    }

    /**
     * Gets a gravatar based on email address.
     * 
     * @param email the email address to get gravatar for.
     * @param size the size of the gravatar.
     */
    function getGravatar(email?: string, size = 96): string {
      email = email || user.email || '';
      if (!email)
        return IDENTITY_DEFAULTS.defaultUser.photoURL;
      const hash = md5(email.trim().toLowerCase());
      return `https://www.gravatar.com/avatar/${hash}?s=${size}&r=g&d=mm`;
    }

    return {
      get defaultUser() { return IDENTITY_DEFAULTS.defaultUser; },
      get isAuthenticated() { return api.isAuthenticated(); },
      get user() { return ensureUser(); },
      get emailLink() { return api.getStorageEmailLink(); },
      get avatar() { return getGravatar() },
      get hasAuthLink() { return api.hasAuthLink(); },
      providers: api.provider.providers,
      signInByLink,
      signInByProvider,
      signInByPassword,
      signInByPhone,
      signOut: api.signOut,
    };

  };

  return useIdentity;

}



