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
  signOut,
  onAuthStateChanged, //Herramienta firebaswe para controlar sesiones
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field = 'title'
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object[field].toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};

export const getCategoriesAndDocuments = async ()=>{
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot)=>{
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
  
};

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
export const createUserWithEmailAndPasswordFunction = async (
  email,
  password
) => {
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

// =====================================================
// * Herramienta de Firebase alternativa a la utilizada
// para conntrolar sesiones *
// =====================================================
// variable que contiene la sesión, función que se llamará cada vez que cambie el estado
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
