# React Firebase Authorize

Firebase authentication made simple.

## Getting Started

```sh
$ yarn add react-firebase-authorize
```

```sh
$ npm install react-firebase-authorize
```

## Import & Configure Firebase

The below does NOT show the [Firebase](https://firebase.google.com/) configuration. Scroll down a bit to see an example. If you already have Firebase configured and you've created an app just import the file where you define the below after the app is created...that's it!

If you need additional **actionCodeSettings** fear not you can pass those
globally in your options or inline when calling the signIn method. By default
we define the typical options so we only need the **emailVerificationUrl** you wish to use. 

```ts
import { createAuth } from 'react-firebase-authorize';

const { useIdentity, useRecaptcha, auth } = createAuth({
  enabledProviders: ['google'],
  emailVerificationUrl: process.env.REACT_APP_FIREBASE_EMAIL_VERIFICATION_URL
});
```

## Import & Configure Firebase 

If you've not already defined and configured your **Firebase** app the below is the typical example. The **firebaseConfig** object below is what Firebase outputs from the console when you enable your app. Not all properties are required. For example you may not use "storage". 

**App, Firestore and Auth** are all required imports for **react-firebase-authorize**. Ensure you've imported all three for your configuration. 

Once this is done and after <code>firebase.initializeApp(firebaseConfig)</code> define your react-firebase-authorize options and intialize the library!

```ts
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import firebaseAuth from 'react-firebase-authorize';

// Note all of the below are NOT required but
// Firebase will default with all these values.

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Ensure the app is not already initialized.
if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);

// Define your react-firebase-authorize configuration here:

const { useIdentity, useRecaptcha, auth } = firebaseAuth({
  firebase,
  enabledProviders: ['google'],
  emailVerificationUrl: process.env.REACT_APP_FIREBASE_EMAIL_VERIFICATION_URL
});

export { firebase };
```

## Docs

See [https://blujedis.github.io/react-firebase-authorize/](https://blujedis.github.io/react-firebase-authorize/)

## Change

See [CHANGE.md](CHANGE.md)

## License

See [LICENSE.md](LICENSE)

