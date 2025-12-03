// =====================================================
// IMPORTS DE FIREBASE AUTH
// =====================================================
// getAuth: Obtiene la instancia de autenticación de Firebase
// signInWithPopup: Abre ventana emergente para autenticación con proveedor
// GoogleAuthProvider: Proveedor de autenticación de Google
// createUserWithEmailAndPassword: Crea nuevo usuario con email/password
// signInWithEmailAndPassword: Inicia sesión con email/password existente
import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword, //Para usuarios mediante email y pass
  signInWithEmailAndPassword
} from "firebase/auth";

// =====================================================
// IMPORTS DE FIREBASE FIRESTORE
// =====================================================
// getFirestore: Obtiene la instancia de la base de datos Firestore
// doc: Crea referencia a un documento específico en Firestore
// getDoc: Lee un documento de Firestore
// setDoc: Escribe/actualiza un documento en Firestore
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// =====================================================
// CONFIGURACIÓN DE FIREBASE
// =====================================================
// initializeApp: Inicializa la conexión con Firebase
import { initializeApp } from "firebase/app";

// firebaseConfig: Objeto con las credenciales de tu proyecto Firebase
// Estas credenciales se obtienen de Firebase Console > Project Settings
// IMPORTANTE: En producción, estas claves deberían estar en variables de entorno
const firebaseConfig = {
  apiKey: "AIzaSyBVrk03bcb0OnUm-xzwKCcQqxTywP__kpY",
  authDomain: "panaderia-0001.firebaseapp.com",
  projectId: "panaderia-0001",
  storageBucket: "panaderia-0001.firebasestorage.app",
  messagingSenderId: "169276494460",
  appId: "1:169276494460:web:7586b1a42c529fb878eff9",
};

// Inicializa Firebase con la configuración anterior
// Esta instancia se usa para todos los servicios de Firebase (Auth, Firestore, etc.)
const firebaseApp = initializeApp(firebaseConfig);

// =====================================================
// CONFIGURACIÓN DEL PROVEEDOR DE AUTENTICACIÓN
// =====================================================
// Creamos una instancia del proveedor de Google
// Otros proveedores disponibles: FacebookAuthProvider, TwitterAuthProvider, etc.
const googleProvider = new GoogleAuthProvider();

// setCustomParameters: Configura parámetros específicos del proveedor
// prompt: "select_account" -> Fuerza al usuario a seleccionar una cuenta cada vez
// Esto es útil si quieres que el usuario pueda elegir entre varias cuentas de Google
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// =====================================================
// EXPORTACIONES DE INSTANCIAS DE FIREBASE
// =====================================================
// auth: Instancia de autenticación que se usará en toda la app
// Se exporta para poder acceder al estado de autenticación desde cualquier componente
export const auth = getAuth(firebaseApp);

// signInWithGooglePopup: Función helper para autenticación con Google mediante popup
// Retorna una Promise que resuelve con el usuario autenticado
// USO: const { user } = await signInWithGooglePopup();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

// signInWithGoogleRedirect: Método alternativo usando redirección completa de página
// NOTA: Comentado porque tiene problemas con CORS en desarrollo local
// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); 

// db: Instancia de Firestore para operaciones con la base de datos
// Se usa para leer/escribir documentos en las colecciones de Firestore
export const db = getFirestore();

// =====================================================
// CREAR/OBTENER DOCUMENTO DE USUARIO EN FIRESTORE
// =====================================================
// Esta función crea un documento de usuario en Firestore si no existe
// PARÁMETROS:
//   - userAuth: Objeto de usuario retornado por Firebase Auth (contiene uid, email, displayName, etc.)
//   - additionalInformation: Datos extra que queremos guardar (ej: {displayName: "Nombre"})
// RETORNA: Referencia al documento del usuario en Firestore
// USO: await createUserDocumentFromAuth(user, { displayName: "John" });
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    // Guard clause: Si no hay usuario autenticado, salir de la función
    if (!userAuth) return;
  
  // doc(db, "users", userAuth.uid): Crea referencia al documento en la colección "users"
  // usando el UID del usuario como ID del documento
  // Estructura: /users/{uid}
  const userDocRef = doc(db, "users", userAuth.uid);
//   console.log(userDocRef);
  
  // getDoc: Intenta leer el documento para verificar si ya existe
  const userSnapshot = await getDoc(userDocRef);
  
  // Si el documento NO existe, lo creamos
  if (!userSnapshot.exists()) {
    // Extraemos displayName y email del objeto userAuth
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // setDoc: Crea el documento en Firestore con los datos del usuario
      // ...additionalInformation: Spread operator para agregar datos extra opcionales
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
  
  // Retornamos la referencia al documento (exista o no)
  // Útil para operaciones futuras con este documento
  return userDocRef;
};

// =====================================================
// REGISTRO DE USUARIO CON EMAIL Y PASSWORD
// =====================================================
// Crea un nuevo usuario en Firebase Authentication
// PARÁMETROS: email, password
// RETORNA: Promise que resuelve con { user } - objeto con datos del usuario creado
// USO: const { user } = await createUserWithEmailAndPasswordFunction(email, password);
// NOTA: Después de crear el usuario, debes llamar a createUserDocumentFromAuth
//       para guardar información adicional en Firestore
export const createUserWithEmailAndPasswordFunction = async(email, password) => {
    // Guard clause: Validar que email y password no estén vacíos
    if (!email || !password) return; 
    // Llama al método nativo de Firebase para crear el usuario
    return await createUserWithEmailAndPassword(auth, email, password);
}

// =====================================================
// INICIO DE SESIÓN CON EMAIL Y PASSWORD
// =====================================================
// Autentica un usuario existente con sus credenciales
// PARÁMETROS: email, password
// RETORNA: Promise que resuelve con { user } - objeto con datos del usuario autenticado
// USO: const { user } = await signInAuthUserWithEmailAndPassword(email, password);
// ERRORES COMUNES:
//   - auth/user-not-found: No existe usuario con ese email
//   - auth/wrong-password: Contraseña incorrecta
export const signInAuthUserWithEmailAndPassword = async(email, password) => {
    // Guard clause: Validar que email y password no estén vacíos
    if (!email || !password) return;
    // Llama al método nativo de Firebase para autenticar
    return await signInWithEmailAndPassword(auth, email, password);
}