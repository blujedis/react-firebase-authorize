[react-firebase-authorize](../README.md) / IAuthOptions

# Interface: IAuthOptions<K\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `K` | [*Provider*](../README.md#provider) |

## Hierarchy

- *AuthBaseOptions*<K\>

  ↳ **IAuthOptions**

## Table of contents

### Properties

- [collectionName](iauthoptions.md#collectionname)
- [databasePersist](iauthoptions.md#databasepersist)
- [emailStorageLinkKey](iauthoptions.md#emailstoragelinkkey)
- [emailVerificationUrl](iauthoptions.md#emailverificationurl)
- [enableWatchState](iauthoptions.md#enablewatchstate)
- [enabledProviders](iauthoptions.md#enabledproviders)
- [firebase](iauthoptions.md#firebase)
- [globalActionCodes](iauthoptions.md#globalactioncodes)
- [isAuthenticatedKey](iauthoptions.md#isauthenticatedkey)
- [logger](iauthoptions.md#logger)
- [onAuthCredential](iauthoptions.md#onauthcredential)
- [updateProps](iauthoptions.md#updateprops)
- [userStorageKey](iauthoptions.md#userstoragekey)

## Properties

### collectionName

• `Optional` **collectionName**: *string*

Inherited from: AuthBaseOptions.collectionName

Defined in: [src/types.ts:58](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L58)

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

### logger

• `Optional` **logger**: (`payload`: [*IAuthLogPayload*](iauthlogpayload.md)) => *void*

#### Type declaration

▸ (`payload`: [*IAuthLogPayload*](iauthlogpayload.md)): *void*

#### Parameters

| Name | Type |
| :------ | :------ |
| `payload` | [*IAuthLogPayload*](iauthlogpayload.md) |

**Returns:** *void*

Defined in: [src/types.ts:66](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L66)

Defined in: [src/types.ts:66](https://github.com/blujedis/react-firebase-authorize/blob/9581d20/src/types.ts#L66)

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
