import type firebase from 'firebase/app';
import type { IAuthCredential, IAuthOptions, Provider } from '../types';
export declare function initModel<K extends Provider>(options: IAuthOptions<K>): {
    findById: (uid: string) => any;
    create: <T extends firebase.UserInfo>(user: T) => void;
    update: <T_1 extends Partial<firebase.UserInfo> & Record<string, any>>(user: T_1) => void;
    handleCredential: (userCredential: IAuthCredential, suppressPersist?: boolean) => Promise<firebase.User>;
};
export declare function createModel<K extends Provider>(options: IAuthOptions<K>): {
    findById: (uid: string) => any;
    create: <T extends firebase.UserInfo>(user: T) => void;
    update: <T_1 extends Partial<firebase.UserInfo> & Record<string, any>>(user: T_1) => void;
    handleCredential: (userCredential: IAuthCredential, suppressPersist?: boolean) => Promise<firebase.User>;
};
//# sourceMappingURL=model.d.ts.map