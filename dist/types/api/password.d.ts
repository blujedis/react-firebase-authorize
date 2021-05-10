import firebase from 'firebase/app';
import { updateProfile } from '../utils/helpers';
import type { Provider, IAuthInitOptions } from '../types';
export declare function initPassword<K extends Provider>(options: IAuthInitOptions<K>): {
    sendPasswordReset: (email: string) => Promise<boolean>;
    confirmPasswordReset: (code: string, newPassword: string) => Promise<boolean>;
    verifyPasswordReset: (code: string) => Promise<string>;
    updatePassword: (newPassword: string) => Promise<boolean>;
    sendVerification: (actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
    updateProfile: typeof updateProfile;
    signIn: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean | firebase.User>;
    signUp: (email: string, password: string, params?: Record<string, any> | undefined, actionCodes?: firebase.auth.ActionCodeSettings | undefined) => Promise<boolean>;
};
//# sourceMappingURL=password.d.ts.map