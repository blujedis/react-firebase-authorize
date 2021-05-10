import firebase from 'firebase/app';
import type { Provider, IAuthInitOptions, ProviderMap } from '../types';
declare type AuthProvider = firebase.auth.AuthProvider;
export declare function initProvider<K extends Provider>(options: IAuthInitOptions<K>): {
    providers: ProviderMap<K>;
    link: {
        (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
        (provider: AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
    };
    signIn: {
        (providerId: K, withRedirect?: boolean | undefined): Promise<firebase.User>;
        (provider: AuthProvider, withRedirect?: boolean | undefined): Promise<firebase.User>;
    };
};
export {};
//# sourceMappingURL=provider.d.ts.map