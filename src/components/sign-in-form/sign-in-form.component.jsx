// =====================================================
// COMPONENTE: FORMULARIO DE INICIO DE SESIÓN (SIGN IN)
// =====================================================
// Este componente permite a usuarios existentes iniciar sesión mediante:
//   1. Email y contraseña
//   2. Cuenta de Google (popup)

import { useState, useContext } from 'react';
import { UserContext } from '../../components/context/user.context';
// IMPORTACIONES DE COMPONENTES
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

// IMPORTACIONES DE FIREBASE
// signInWithGooglePopup: Autenticación con Google mediante ventana emergente
// createUserDocumentFromAuth: Guarda/actualiza datos del usuario en Firestore
// signInAuthUserWithEmailAndPassword: Autenticación con email/password
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils.bckup';

import './sign-in-form.styles.scss';

// =====================================================
// ESTADO INICIAL DEL FORMULARIO
// =====================================================
// Solo necesitamos email y password para iniciar sesión
const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  // =====================================================
  // ESTADO LOCAL
  // =====================================================
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;


  // Para usar el contexto
const { setCurrentUser } = useContext(UserContext);
  // =====================================================
  // FUNCIÓN: RESETEAR FORMULARIO
  // =====================================================
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // =====================================================
  // FUNCIÓN: INICIO DE SESIÓN CON GOOGLE
  // =====================================================
  // Abre un popup de Google para que el usuario se autentique
  // FLUJO:
  //   1. Abre ventana popup de Google
  //   2. Usuario selecciona cuenta y autoriza
  //   3. Recibimos los datos del usuario
  //   4. Creamos/actualizamos documento en Firestore
  const signInWithGoogle = async () => {
    try {
      // signInWithGooglePopup abre el popup y retorna el usuario autenticado
      const { user } = await signInWithGooglePopup();
      
      // Guardamos/actualizamos los datos del usuario en Firestore
      // Si es la primera vez, crea el documento. Si ya existe, no hace nada.
      await createUserDocumentFromAuth(user);
            setCurrentUser(user);

    } catch (error) {
      // MANEJO DE ERRORES
      // Si el usuario cierra el popup, no mostramos error (es acción intencional)
      if (error.code !== 'auth/popup-closed-by-user') {
        console.error('Error al autenticar con Google:', error);
      }
    }
  };

  // =====================================================
  // FUNCIÓN: MANEJAR ENVÍO DEL FORMULARIO
  // =====================================================
  // Se ejecuta cuando el usuario hace submit con email/password
  // FLUJO:
  //   1. Intenta autenticar con las credenciales
  //   2. Si es exitoso, resetea el formulario
  //   3. Si falla, muestra error específico
  const handleSubmit = async (event) => {
    // Previene el comportamiento por defecto del formulario
    event.preventDefault();

    try {
      // Intenta autenticar al usuario con email y password
      // Retorna un objeto con información del usuario si es exitoso
      const {user} = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      
      // Si llegamos aquí, el inicio de sesión fue exitoso
      resetFormFields();
      
    } catch (error) {
      // MANEJO DE ERRORES ESPECÍFICOS
      // Firebase retorna códigos de error específicos que podemos manejar
      switch (error.code) {
        case 'auth/wrong-password':
          // Contraseña incorrecta
          alert('incorrect password for email');
          break;
        case 'auth/user-not-found':
          // No existe usuario con ese email
          alert('no user associated with this email');
          break;
        default:
          // Cualquier otro error
          console.log(error);
      }
    }
  };

  // =====================================================
  // FUNCIÓN: MANEJAR CAMBIOS EN LOS INPUTS
  // =====================================================
  // Actualiza el estado cuando el usuario escribe en los campos
  const handleChange = (event) => {
    const { name, value } = event.target;
    // Mantiene los valores anteriores y actualiza solo el campo modificado
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className='sign-up-container'>
      <h2>¿Ya tienes una cuenta?</h2>
      <span>Inicia sesión con tu correo electrónico y contraseña</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className='buttons-container'>
          <Button type='submit'>Iniciar sesión
</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Iniciar sesión Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
