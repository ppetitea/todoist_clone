import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { firebaseConfig } from "../../config/config";

const getFirebaseApp = () => {
  const shouldInitializeFirebase = firebase?.apps?.length === 0;
  if (shouldInitializeFirebase) return firebase.initializeApp(firebaseConfig);
  else return firebase.app();
};

const app = getFirebaseApp();
const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
