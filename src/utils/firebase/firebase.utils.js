import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, //Para usuarios mediante email y pass
  signInWithEmailAndPassword
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// ---------------- From Firebase ----------------
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVrk03bcb0OnUm-xzwKCcQqxTywP__kpY",
  authDomain: "panaderia-0001.firebaseapp.com",
  projectId: "panaderia-0001",
  storageBucket: "panaderia-0001.firebasestorage.app",
  messagingSenderId: "169276494460",
  appId: "1:169276494460:web:7586b1a42c529fb878eff9",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// ----------------

// Autenticación
// Indicamos quién es el proveedor (GoogleAuthProvider, FacebookAuthProvider, etc...)
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(firebaseApp);
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); 
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createUserWithEmailAndPasswordFunction = async(email, password) => {
    if (!email || !password) return; 
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}