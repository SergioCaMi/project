// =====================================================
// * IMPORTS *
// =====================================================
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from "firebase/firestore";

import { initializeApp } from "firebase/app";

// =====================================================
// * CONFIGURACIÓN FIREBASE *
// =====================================================
const firebaseConfig = {
  apiKey: "AIzaSyBVrk03bcb0OnUm-xzwKCcQqxTywP__kpY",
  authDomain: "panaderia-0001.firebaseapp.com",
  projectId: "panaderia-0001",
  storageBucket: "panaderia-0001.firebasestorage.app",
  messagingSenderId: "169276494460",
  appId: "1:169276494460:web:7586b1a42c529fb878eff9",
};

// Inicialización general
const firebaseApp = initializeApp(firebaseConfig);

// =====================================================
// * INSTANCIAS *
// =====================================================
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Proveedor de Google
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// =====================================================
// * LOGIN CON GOOGLE *
// =====================================================
// Login con Popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Login con Redirect (opción alternativa)
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// =====================================================
// * CREAR U OBTENER DOCUMENTO DE USUARIO *
// =====================================================
export const createUserDocumentFromAuth = async (userAuth, addInfo = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...addInfo,
      });
    } catch (error) {
      console.log("Error creando el usuario:", error.message);
    }
  }

  return userDocRef;
};

// =====================================================
// * REGISTRO CON EMAIL / PASSWORD *
// =====================================================
export const createUserWithEmailAndPasswordFunction = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

// =====================================================
// * LOGIN CON EMAIL / PASSWORD *
// =====================================================
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// =====================================================
// * LOGOUT *
// =====================================================
export const signOutUser = async () => await signOut(auth);