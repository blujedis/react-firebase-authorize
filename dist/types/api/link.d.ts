import firebase from 'firebase/app';
import type { Provider, IAuthInitOptions } from '../types';
export declare function initLink<K extends Provider>(options: IAuthInitOptions<K>): {
    signUp: (email: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
    signIn: (email: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
};
//# sourceMappingURL=link.d.ts.map