import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../../utils/firebase/firebase.utils.bckup";

import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import { auth } from "../../../utils/firebase/firebase.utils.bckup";

import SignUpForm from "../../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  // ============ MÉTODO 1: POPUP ============
  // Más simple y directo. Abre una ventana emergente de Google.
  // Retorna inmediatamente el usuario autenticado.
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    console.log("Usuario con popup:", user);
  };

  // ============ MÉTODO 2: REDIRECT ============
  // Redirige a la página de Google y vuelve después de autenticar.
  // Necesita useEffect para capturar el resultado cuando regresa.
  // NOTA: Puede tener problemas con CORS en desarrollo local.
  useEffect(() => {
    const fetchRedirectResult = async () => {
      try {
        const response = await getRedirectResult(auth);
        console.log("Respuesta de redirect:", response);
        if (response) {
          await createUserDocumentFromAuth(response.user);
          console.log("Usuario autenticado con redirect:", response.user);
        } else {
          console.log("No hay redirección pendiente");
        }
      } catch (error) {
        console.error("Error en redirect:", error);
      }
    };
    fetchRedirectResult();
  }, []);

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignUpForm/>
    </div>
  );
};

export default SignIn;
