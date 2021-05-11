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
- [Providers](interfaces/providers.md)

### Type aliases

- [AuthApi](README.md#authapi)
- [ConfirmAuthCode](README.md#confirmauthcode)
- [Firebase](README.md#firebase)
- [Provider](README.md#provider)
- [ProviderMap](README.md#providermap)

### Variables

- [ACTION\_CODES](README.md#action_codes)
- [AUTH\_DEFAULTS](README.md#auth_defaults)
- [IS\_DEV](README.md#is_dev)

### Functions

- [default](README.md#default)

## Type aliases

### AuthApi

Ƭ **AuthApi**<K\>: *ReturnType*<*TypeWrapper*<K\>[``"main"``]\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [*Provider*](README.md#provider) |

Defined in: [src/types.ts:20](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L20)

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

Defined in: [src/types.ts:39](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L39)

___

### Firebase

Ƭ **Firebase**: *typeof* firebase

Defined in: [src/types.ts:18](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L18)

___

### Provider

Ƭ **Provider**: keyof [*Providers*](interfaces/providers.md)

Defined in: [src/types.ts:33](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L33)

___

### ProviderMap

Ƭ **ProviderMap**<K\>: { [P in K]: Providers[K]}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [*Provider*](README.md#provider) |

Defined in: [src/types.ts:34](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L34)

## Variables

### ACTION\_CODES

• `Const` **ACTION\_CODES**: firebase.auth.ActionCodeSettings

Defined in: [src/constants.ts:6](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/constants.ts#L6)

___

### AUTH\_DEFAULTS

• `Const` **AUTH\_DEFAULTS**: [*IAuthOptions*](interfaces/iauthoptions.md)<any\>

Defined in: [src/constants.ts:14](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/constants.ts#L14)

___

### IS\_DEV

• `Const` **IS\_DEV**: *boolean*

Defined in: [src/constants.ts:4](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/constants.ts#L4)

## Functions

### default

▸ **default**<K\>(`options`: [*IAuthOptions*](interfaces/iauthoptions.md)<K\>): *object*

Initialize the firebase auth instance exposing methods
and helpers for signing into firebase.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | keyof [*Providers*](interfaces/providers.md) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `options` | [*IAuthOptions*](interfaces/iauthoptions.md)<K\> | IAuthOptions object. |

**Returns:** *object*

| Name | Type |
| :------ | :------ |
| `api` | *object* |
| `api.ensureDisplayName` | <U\>(`user`: U) => U |
| `api.getStorageEmailLink` | <T\>(`def`: T) => T |
| `api.getStorageUser` | <T\>(`def`: T) => T |
| `api.hasAuthLink` | () => *boolean* |
| `api.hasStorageEmailLink` | () => *boolean* |
| `api.hasStorageUser` | () => *boolean* |
| `api.isAuthenticated` | () => *boolean* |
| `api.link` | *object* |
| `api.link.signIn` | (`email`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> |
| `api.link.signUp` | (`email`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `api.log` | (`message`: *string*) => *void*<E\>(`error`: E) => *void*(`data`: *Record*<string, any\>) => *void*(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `message`: *string*) => *void*<E\>(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `error`: E) => *void*(`type`: [*IAuthLogPayload*](interfaces/iauthlogpayload.md)[``"level"``], `data`: *Record*<string, any\>) => *void* |
| `api.mapUser` | <U\>(`user`: firebase.User \| ``null``, `extend`: U) => ``null`` \| UserInfo & U |
| `api.model` | *object* |
| `api.model.create` | <T\>(`user`: T) => *void* |
| `api.model.findById` | (`uid`: *string*) => *Promise*<DocumentSnapshot<DocumentData\>\> |
| `api.model.handleCredential` | (`userCredential`: [*IAuthCredential*](interfaces/iauthcredential.md), `suppressPersist`: *boolean*) => *Promise*<firebase.User\> |
| `api.model.update` | <T\>(`user`: T) => *void* |
| `api.options` | [*IAuthOptions*](interfaces/iauthoptions.md)<K\> |
| `api.password` | *object* |
| `api.password.confirmPasswordReset` | (`code`: *string*, `newPassword`: *string*) => *Promise*<boolean\> |
| `api.password.sendPasswordReset` | (`email`: *string*) => *Promise*<boolean\> |
| `api.password.sendVerification` | (`actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `api.password.signIn` | (`email`: *string*, `password`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> |
| `api.password.signUp` | (`email`: *string*, `password`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean\> |
| `api.password.updatePassword` | (`newPassword`: *string*) => *Promise*<boolean\> |
| `api.password.updateProfile` | (`profile`: { `displayName?`: *string* ; `photoURL?`: *string*  }) => *Promise*<boolean\> |
| `api.password.verifyPasswordReset` | (`code`: *string*) => *Promise*<string\> |
| `api.phone` | *object* |
| `api.phone.signIn` | (`number`: *string*, `verifier`: firebase.auth.RecaptchaVerifier) => *Promise*<(`code`: *string*) => *Promise*<User\>\> |
| `api.provider` | *object* |
| `api.provider.link` | (`providerId`: K, `withRedirect?`: *boolean*) => *Promise*<firebase.User\>(`provider`: AuthProvider, `withRedirect?`: *boolean*) => *Promise*<firebase.User\> |
| `api.provider.providers` | [*ProviderMap*](README.md#providermap)<K\> |
| `api.provider.signIn` | (`providerId`: K, `withRedirect?`: *boolean*) => *Promise*<firebase.User\>(`provider`: AuthProvider, `withRedirect?`: *boolean*) => *Promise*<firebase.User\> |
| `api.removeStorageAuthenticated` | () => *void* |
| `api.removeStorageEmailLink` | () => *void* |
| `api.removeStorageUser` | () => *void* |
| `api.setStorageAuthenticated` | () => *void* |
| `api.setStorageEmailLink` | (`email`: *string*) => *void* |
| `api.setStorageUser` | (`value`: *string* \| *number* \| *boolean* \| *Record*<string, any\> \| Date) => *void* |
| `api.signOut` | (`redirect?`: *string* \| () => *void*) => *Promise*<void\> |
| `api.unsubscribeWatchState` | Unsubscribe |
| `api.watchState` | (`handler?`: (`user`: firebase.User \| ``null``) => *void*) => Unsubscribe |
| `useIdentity` | <U\>(`props?`: [*IAuthIdentity*](interfaces/iauthidentity.md)<U\>) => { `providers`: [*ProviderMap*](README.md#providermap)<K\> ; `signInByLink`: (`email`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> ; `signInByPassword`: (`email`: *string*, `password`: *string*, `params?`: *Record*<string, any\>, `actionCodes?`: firebase.auth.ActionCodeSettings) => *Promise*<boolean \| User\> ; `signInByPhone`: (`number`: *string*, `verifier`: firebase.auth.RecaptchaVerifier) => *Promise*<(`code`: *string*) => *Promise*<User\>\> ; `signInByProvider`: (`providerId`: K, `withRedirect?`: *boolean*) => *Promise*<firebase.User\>(`provider`: AuthProvider, `withRedirect?`: *boolean*) => *Promise*<firebase.User\> ; `signOut`: (`redirect?`: *string* \| () => *void*) => *Promise*<void\> ; `avatar`:  ; `defaultUser`:  ; `emailLink`:  ; `hasAuthLink`:  ; `isAuthenticated`:  ; `user`:   } |
| `useRecaptcha` | () => { `RecaptchaComponent`: (`props`: DivProps) => *Element* ; `createVerifier`: (`options?`: [*IRecaptchaOptions*](interfaces/irecaptchaoptions.md)) => *RecaptchaVerifier* ; `ref`: *RefObject*<HTMLDivElement\>  } |

Defined in: [src/main.ts:181](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/main.ts#L181)
