[react-firebase-authorize](../README.md) / IAuthInitOptions

# Interface: IAuthInitOptions<K\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [*Provider*](../README.md#provider) |

## Hierarchy

- *AuthBaseOptions*<K\>

  ↳ **IAuthInitOptions**

## Table of contents

### Properties

- [collectionName](iauthinitoptions.md#collectionname)
- [common](iauthinitoptions.md#common)
- [databasePersist](iauthinitoptions.md#databasepersist)
- [emailStorageLinkKey](iauthinitoptions.md#emailstoragelinkkey)
- [emailVerificationUrl](iauthinitoptions.md#emailverificationurl)
- [enableWatchState](iauthinitoptions.md#enablewatchstate)
- [enabledProviders](iauthinitoptions.md#enabledproviders)
- [firebase](iauthinitoptions.md#firebase)
- [globalActionCodes](iauthinitoptions.md#globalactioncodes)
- [isAuthenticatedKey](iauthinitoptions.md#isauthenticatedkey)
- [log](iauthinitoptions.md#log)
- [model](iauthinitoptions.md#model)
- [onAuthCredential](iauthinitoptions.md#onauthcredential)
- [updateProps](iauthinitoptions.md#updateprops)
- [userStorageKey](iauthinitoptions.md#userstoragekey)

## Properties

### collectionName

• `Optional` **collectionName**: *string*

Inherited from: AuthBaseOptions.collectionName

Defined in: [src/types.ts:58](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L58)

___

### common

• **common**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `ensureDisplayName` | <U\>(`user`: U) => U |
| `getStorageEmailLink` | <T\>(`def`: T) => T |
| `getStorageUser` | <T\>(`def`: T) => T |
| `hasAuthLink` | () => *boolean* |
| `hasStorageEmailLink` | () => *boolean* |
| `hasStorageUser` | () => *boolean* |
| `isAuthenticated` | () => *boolean* |
| `mapUser` | <U\>(`user`: firebase.User \| ``null``, `extend`: U) => ``null`` \| UserInfo & U |
| `removeStorageAuthenticated` | () => *void* |
| `removeStorageEmailLink` | () => *void* |
| `removeStorageUser` | () => *void* |
| `setStorageAuthenticated` | () => *void* |
| `setStorageEmailLink` | (`email`: *string*) => *void* |
| `setStorageUser` | (`value`: *string* \| *number* \| *boolean* \| *Record*<string, any\> \| Date) => *void* |
| `stringifyParams` | (`params`: *Record*<string, any\>) => *string* |
| `updateProfile` | (`profile`: { `displayName?`: *string* ; `photoURL?`: *string*  }) => *Promise*<boolean\> |

Defined in: [src/types.ts:72](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L72)

___

### databasePersist

• `Optional` **databasePersist**: *boolean*

Inherited from: AuthBaseOptions.databasePersist

Defined in: [src/types.ts:59](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L59)

___

### emailStorageLinkKey

• `Optional` **emailStorageLinkKey**: *string*

Inherited from: AuthBaseOptions.emailStorageLinkKey

Defined in: [src/types.ts:55](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L55)

___

### emailVerificationUrl

• `Optional` **emailVerificationUrl**: *string*

Inherited from: AuthBaseOptions.emailVerificationUrl

Defined in: [src/types.ts:56](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L56)

___

### enableWatchState

• `Optional` **enableWatchState**: *boolean*

Inherited from: AuthBaseOptions.enableWatchState

Defined in: [src/types.ts:52](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L52)

___

### enabledProviders

• `Optional` **enabledProviders**: K[]

Inherited from: AuthBaseOptions.enabledProviders

Defined in: [src/types.ts:57](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L57)

___

### firebase

• **firebase**: *typeof* firebase

Inherited from: AuthBaseOptions.firebase

Defined in: [src/types.ts:51](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L51)

___

### globalActionCodes

• `Optional` **globalActionCodes**: ActionCodeSettings

Inherited from: AuthBaseOptions.globalActionCodes

Defined in: [src/types.ts:62](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L62)

___

### isAuthenticatedKey

• `Optional` **isAuthenticatedKey**: *string*

Inherited from: AuthBaseOptions.isAuthenticatedKey

Defined in: [src/types.ts:53](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L53)

___

### log

• **log**: (`payload`: [*IAuthLogPayload*](iauthlogpayload.md)) => *void*

#### Type declaration

▸ (`payload`: [*IAuthLogPayload*](iauthlogpayload.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [*IAuthLogPayload*](iauthlogpayload.md) |

**Returns:** *void*

Defined in: [src/types.ts:70](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L70)

Defined in: [src/types.ts:70](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L70)

___

### model

• **model**: *object*

#### Type declaration

| Name | Type |
| :------ | :------ |
| `create` | <T\>(`user`: T) => *void* |
| `findById` | (`uid`: *string*) => *Promise*<DocumentSnapshot<DocumentData\>\> |
| `handleCredential` | (`userCredential`: [*IAuthCredential*](iauthcredential.md), `suppressPersist`: *boolean*) => *Promise*<firebase.User\> |
| `update` | <T\>(`user`: T) => *void* |

Defined in: [src/types.ts:71](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L71)

___

### onAuthCredential

• `Optional` **onAuthCredential**: (`userCredential`: [*IAuthCredential*](iauthcredential.md)) => ``null`` \| UserInfo & *Record*<string, any\>

#### Type declaration

▸ (`userCredential`: [*IAuthCredential*](iauthcredential.md)): ``null`` \| UserInfo & *Record*<string, any\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `userCredential` | [*IAuthCredential*](iauthcredential.md) |

**Returns:** ``null`` \| UserInfo & *Record*<string, any\>

Defined in: [src/types.ts:61](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L61)

Inherited from: AuthBaseOptions.onAuthCredential

Defined in: [src/types.ts:61](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L61)

___

### updateProps

• `Optional` **updateProps**: *string*[]

Inherited from: AuthBaseOptions.updateProps

Defined in: [src/types.ts:60](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L60)

___

### userStorageKey

• `Optional` **userStorageKey**: *string*

Inherited from: AuthBaseOptions.userStorageKey

Defined in: [src/types.ts:54](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L54)
