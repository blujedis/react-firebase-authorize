react-firebase-authorize

# react-firebase-authorize

## Table of contents

### Interfaces

- [IAuthCredential](interfaces/iauthcredential.md)
- [IAuthIdentity](interfaces/iauthidentity.md)
- [IAuthInitOptions](interfaces/iauthinitoptions.md)
- [IAuthLogPayload](interfaces/iauthlogpayload.md)
- [IAuthOptions](interfaces/iauthoptions.md)
- [IRecaptchaOptions](interfaces/irecaptchaoptions.md)

### Type aliases

- [AuthApi](README.md#authapi)
- [AuthUtils](README.md#authutils)
- [ConfirmAuthCode](README.md#confirmauthcode)
- [Firebase](README.md#firebase)
- [Provider](README.md#provider)
- [ProviderInstance](README.md#providerinstance)
- [ProviderMap](README.md#providermap)
- [Providers](README.md#providers)

### Variables

- [ACTION\_CODES](README.md#action_codes)
- [AUTH\_DEFAULTS](README.md#auth_defaults)
- [IS\_DEV](README.md#is_dev)
- [PROVIDERS](README.md#providers)

### Functions

- [createAuth](README.md#createauth)
- [initApi](README.md#initapi)

## Type aliases

### AuthApi

Ƭ **AuthApi**<K\>: *ReturnType*<*TypeWrapper*<K\>[``"main"``]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [*Provider*](README.md#provider) |

Defined in: [src/types.ts:22](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L22)

___

### AuthUtils

Ƭ **AuthUtils**<K\>: *ReturnType*<*TypeWrapper*<K\>[``"utils"``]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [*Provider*](README.md#provider) |

Defined in: [src/types.ts:23](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L23)

___

### ConfirmAuthCode

Ƭ **ConfirmAuthCode**: <U\>(`code`: *string*) => *Promise*<U\>

#### Type declaration

▸ <U\>(`code`: *string*): *Promise*<U\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `U` | firebase.User |

#### Parameters

| Name | Type |
| :------ | :------ |
| `code` | *string* |

**Returns:** *Promise*<U\>

Defined in: [src/types.ts:32](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L32)

___

### Firebase

Ƭ **Firebase**: *typeof* firebase

Defined in: [src/types.ts:20](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L20)

___

### Provider

Ƭ **Provider**: keyof [*Providers*](README.md#providers)

Defined in: [src/types.ts:26](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L26)

___

### ProviderInstance

Ƭ **ProviderInstance**<K\>: *ReturnType*<*typeof* initProvider\> & { `providers`: [*ProviderMap*](README.md#providermap)<K\>  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [*Provider*](README.md#provider) |

Defined in: [src/types.ts:28](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L28)

___

### ProviderMap

Ƭ **ProviderMap**<K\>: { [P in K]: ReturnType<Providers[K]\>}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [*Provider*](README.md#provider) |

Defined in: [src/types.ts:27](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L27)

___

### Providers

Ƭ **Providers**: *typeof* [*PROVIDERS*](README.md#providers)

Defined in: [src/types.ts:25](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L25)

## Variables

### ACTION\_CODES

• `Const` **ACTION\_CODES**: firebase.auth.ActionCodeSettings

Defined in: [src/constants.ts:6](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/constants.ts#L6)

___

### AUTH\_DEFAULTS

• `Const` **AUTH\_DEFAULTS**: [*IAuthOptions*](interfaces/iauthoptions.md)<any\>

Defined in: [src/constants.ts:14](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/constants.ts#L14)

___

### IS\_DEV

• `Const` **IS\_DEV**: *boolean*

Defined in: [src/constants.ts:4](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/constants.ts#L4)

___

### PROVIDERS

• `Const` **PROVIDERS**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `apple` | () => *OAuthProvider* |
| `facebook` | () => *FacebookAuthProvider* |
| `github` | () => *GithubAuthProvider* |
| `google` | () => *GoogleAuthProvider* |
| `microsoft` | () => *OAuthProvider* |
| `phone` | (`auth?`: Auth) => *PhoneAuthProvider* |
| `twitter` | () => *TwitterAuthProvider* |
| `yahoo` | () => *OAuthProvider* |

Defined in: [src/constants.ts:28](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/constants.ts#L28)

## Functions

### createAuth

▸ **createAuth**<K\>(`options`: [*IAuthOptions*](interfaces/iauthoptions.md)<K\>): *object*

Initialize the firebase auth instance exposing methods
and helpers for signing into firebase.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | ``"google"`` \| ``"facebook"`` \| ``"github"`` \| ``"twitter"`` \| ``"microsoft"`` \| ``"yahoo"`` \| ``"apple"`` \| ``"phone"`` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [*IAuthOptions*](interfaces/iauthoptions.md)<K\> | IAuthOptions object. |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `auth` | *object* |
| `auth.ensureDisplayName` | <U\>(`user`: U) => U |
| `auth.getStorageEmailLink` | <T\>(`def`: T) => T |
| `auth.getStorageUser` | <T\>(`def`: T) => T |
| `auth.hasAuthLink` | () => *boolean* |
| `auth.hasStorageEmailLink` | () => *boolean* |
| `auth.hasStorageUser` | () => *boolean* |
| `auth.isAuthenticated` | () => *boolean* |
| `auth.link` | *object* |
| `auth.link.signIn` | (`email`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> |
| `auth.link.signUp` | (`email`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `auth.log` | (`message`: *string*) => *void*<E\>(`error`: E) => *void*(`data`: *Record*<string, any\>) => *void*(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `message`: *string*) => *void*<E\>(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `error`: E) => *void*(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `data`: *Record*<string, any\>) => *void* |
| `auth.mapUser` | <U\>(`user`: firebase.User \| ``null``, `extend`: U) => ``null`` \| UserInfo & U |
| `auth.model` | *object* |
| `auth.model.create` | <T\>(`user`: T) => *void* |
| `auth.model.findById` | (`uid`: *string*) => *Promise*<DocumentSnapshot<DocumentData\>\> |
| `auth.model.handleCredential` | (`userCredential`: [*IAuthCredential*](interfaces/iauthcredential.md), `suppressPersist`: *boolean*) => *Promise*<firebase.User\> |
| `auth.model.update` | <T\>(`user`: T) => *void* |
| `auth.options` | [*IAuthOptions*](interfaces/iauthoptions.md)<K\> |
| `auth.password` | *object* |
| `auth.password.confirmPasswordReset` | (`code`: *string*, `newPassword`: *string*) => *Promise*<boolean\> |
| `auth.password.sendPasswordReset` | (`email`: *string*) => *Promise*<boolean\> |
| `auth.password.sendVerification` | (`actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `auth.password.signIn` | (`email`: *string*, `password`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> |
| `auth.password.signUp` | (`email`: *string*, `password`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `auth.password.updatePassword` | (`newPassword`: *string*) => *Promise*<boolean\> |
| `auth.password.updateProfile` | (`profile`: { `displayName?`: *string* ; `photoURL?`: *string*  }) => *Promise*<boolean\> |
| `auth.password.verifyPasswordReset` | (`code`: *string*) => *Promise*<string\> |
| `auth.phone` | *object* |
| `auth.phone.signIn` | (`number`: *string*, `verifier`: firebase.auth.RecaptchaVerifier) => *Promise*<(`code`: *string*) => *Promise*<User\>\> |
| `auth.provider` | *object* |
| `auth.provider.link` | (`providerId`: K, `withRedirect?`: *boolean*) => *Promise*<firebase.User\>(`provider`: AuthProvider, `withRedirect?`: *boolean*) => *Promise*<firebase.User\> |
| `auth.provider.providers` | [*ProviderMap*](README.md#providermap)<K\> |
| `auth.provider.signIn` | (`providerId`: K, `withRedirect?`: *boolean*) => *Promise*<firebase.User\>(`provider`: AuthProvider, `withRedirect?`: *boolean*) => *Promise*<firebase.User\> |
| `auth.removeStorageAuthenticated` | () => *void* |
| `auth.removeStorageEmailLink` | () => *void* |
| `auth.removeStorageUser` | () => *void* |
| `auth.setStorageAuthenticated` | () => *void* |
| `auth.setStorageEmailLink` | (`email`: *string*) => *void* |
| `auth.setStorageUser` | (`value`: *string* \| *number* \| *boolean* \| *Record*<string, any\> \| Date) => *void* |
| `auth.signOut` | (`redirect?`: *string* \| () => *void*) => *Promise*<void\> |
| `auth.unsubscribeWatchState` | Unsubscribe |
| `auth.watchState` | (`handler?`: (`user`: firebase.User \| ``null``) => *void*) => Unsubscribe |
| `useIdentity` | <U\>(`props?`: [*IAuthIdentity*](interfaces/iauthidentity.md)<U\>) => { `providers`: [*ProviderMap*](README.md#providermap)<K\> ; `signInByLink`: (`email`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> ; `signInByPassword`: (`email`: *string*, `password`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> ; `signInByPhone`: (`number`: *string*, `verifier`: firebase.auth.RecaptchaVerifier) => *Promise*<(`code`: *string*) => *Promise*<User\>\> ; `signInByProvider`: (`providerId`: K, `withRedirect?`: *boolean*) => *Promise*<firebase.User\>(`provider`: AuthProvider, `withRedirect?`: *boolean*) => *Promise*<firebase.User\> ; `signOut`: (`redirect?`: *string* \| () => *void*) => *Promise*<void\> ; `avatar`:  ; `defaultUser`:  ; `emailLink`:  ; `hasAuthLink`:  ; `isAuthenticated`:  ; `user`:   } |
| `useRecaptcha` | () => { `RecaptchaComponent`: (`props`: DivProps) => *Element* ; `createVerifier`: (`options?`: [*IRecaptchaOptions*](interfaces/irecaptchaoptions.md)) => *RecaptchaVerifier* ; `ref`: *RefObject*<HTMLDivElement\>  } |

Defined in: [src/main.ts:178](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/main.ts#L178)

___

### initApi

▸ **initApi**<K\>(`options`: [*IAuthOptions*](interfaces/iauthoptions.md)<K\>): *object*

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | ``"google"`` \| ``"facebook"`` \| ``"github"`` \| ``"twitter"`` \| ``"microsoft"`` \| ``"yahoo"`` \| ``"apple"`` \| ``"phone"`` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | [*IAuthOptions*](interfaces/iauthoptions.md)<K\> |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `ensureDisplayName` | <U\>(`user`: U) => U |
| `getStorageEmailLink` | <T\>(`def`: T) => T |
| `getStorageUser` | <T\>(`def`: T) => T |
| `hasAuthLink` | () => *boolean* |
| `hasStorageEmailLink` | () => *boolean* |
| `hasStorageUser` | () => *boolean* |
| `isAuthenticated` | () => *boolean* |
| `link` | *object* |
| `link.signIn` | (`email`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> |
| `link.signUp` | (`email`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `log` | (`message`: *string*) => *void*<E\>(`error`: E) => *void*(`data`: *Record*<string, any\>) => *void*(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `message`: *string*) => *void*<E\>(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `error`: E) => *void*(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `data`: *Record*<string, any\>) => *void* |
| `mapUser` | <U\>(`user`: firebase.User \| ``null``, `extend`: U) => ``null`` \| UserInfo & U |
| `model` | *object* |
| `model.create` | <T\>(`user`: T) => *void* |
| `model.findById` | (`uid`: *string*) => *Promise*<DocumentSnapshot<DocumentData\>\> |
| `model.handleCredential` | (`userCredential`: [*IAuthCredential*](interfaces/iauthcredential.md), `suppressPersist`: *boolean*) => *Promise*<firebase.User\> |
| `model.update` | <T\>(`user`: T) => *void* |
| `options` | [*IAuthOptions*](interfaces/iauthoptions.md)<K\> |
| `password` | *object* |
| `password.confirmPasswordReset` | (`code`: *string*, `newPassword`: *string*) => *Promise*<boolean\> |
| `password.sendPasswordReset` | (`email`: *string*) => *Promise*<boolean\> |
| `password.sendVerification` | (`actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `password.signIn` | (`email`: *string*, `password`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> |
| `password.signUp` | (`email`: *string*, `password`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `password.updatePassword` | (`newPassword`: *string*) => *Promise*<boolean\> |
| `password.updateProfile` | (`profile`: { `displayName?`: *string* ; `photoURL?`: *string*  }) => *Promise*<boolean\> |
| `password.verifyPasswordReset` | (`code`: *string*) => *Promise*<string\> |
| `phone` | *object* |
| `phone.signIn` | (`number`: *string*, `verifier`: firebase.auth.RecaptchaVerifier) => *Promise*<(`code`: *string*) => *Promise*<User\>\> |
| `provider` | *object* |
| `provider.link` | (`providerId`: K, `withRedirect?`: *boolean*) => *Promise*<firebase.User\>(`provider`: AuthProvider, `withRedirect?`: *boolean*) => *Promise*<firebase.User\> |
| `provider.providers` | [*ProviderMap*](README.md#providermap)<K\> |
| `provider.signIn` | (`providerId`: K, `withRedirect?`: *boolean*) => *Promise*<firebase.User\>(`provider`: AuthProvider, `withRedirect?`: *boolean*) => *Promise*<firebase.User\> |
| `removeStorageAuthenticated` | () => *void* |
| `removeStorageEmailLink` | () => *void* |
| `removeStorageUser` | () => *void* |
| `setStorageAuthenticated` | () => *void* |
| `setStorageEmailLink` | (`email`: *string*) => *void* |
| `setStorageUser` | (`value`: *string* \| *number* \| *boolean* \| *Record*<string, any\> \| Date) => *void* |
| `signOut` | (`redirect?`: *string* \| () => *void*) => *Promise*<void\> |
| `unsubscribeWatchState` | Unsubscribe |
| `watchState` | (`handler?`: (`user`: firebase.User \| ``null``) => *void*) => Unsubscribe |

Defined in: [src/main.ts:15](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/main.ts#L15)
