[react-firebase-authorize](../README.md) / IAuthCredential

# Interface: IAuthCredential

## Hierarchy

- *Omit*<firebase.auth.UserCredential, ``"credential"``\>

  ↳ **IAuthCredential**

## Table of contents

### Properties

- [additionalUserInfo](iauthcredential.md#additionaluserinfo)
- [credential](iauthcredential.md#credential)
- [operationType](iauthcredential.md#operationtype)
- [user](iauthcredential.md#user)

## Properties

### additionalUserInfo

• `Optional` **additionalUserInfo**: ``null`` \| AdditionalUserInfo

Inherited from: Omit.additionalUserInfo

Defined in: node_modules/firebase/index.d.ts:4451

___

### credential

• `Optional` **credential**: *AuthCredential* & { `accessToken?`: *string* ; `idToken?`: *string*  }

Set credential to optional as we may not
have it if passing to user defined handler
on auth state changed.

Defined in: [src/types.ts:40](https://github.com/blujedis/react-firebase-authorize/blob/d3b55aa/src/types.ts#L40)

___

### operationType

• `Optional` **operationType**: ``null`` \| *string*

Inherited from: Omit.operationType

Defined in: node_modules/firebase/index.d.ts:4453

___

### user

• **user**: ``null`` \| User

Inherited from: Omit.user

Defined in: node_modules/firebase/index.d.ts:4454
