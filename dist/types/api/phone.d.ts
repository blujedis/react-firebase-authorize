import firebase from 'firebase/app';
import type { Provider, IAuthInitOptions } from '../types';
export declare function initPhone<K extends Provider>(options: IAuthInitOptions<K>): {
    signIn: (number: string, verifier: firebase.auth.RecaptchaVerifier) => Promise<(code: string) => Promise<firebase.User>>;
};
//# sourceMappingURL=phone.d.ts.map