// =====================================================
// COMPONENTE: FORMULARIO DE REGISTRO (SIGN UP)
// =====================================================
// Este componente permite a los usuarios crear una nueva cuenta
// con email, password y nombre de usuario

import { useState, useContext } from "react";
import { UserContext } from "../../components/context/user.context";
// IMPORTACIONES DE FIREBASE
// createUserWithEmailAndPasswordFunction: Crea usuario en Firebase Auth
// createUserDocumentFromAuth: Guarda datos adicionales del usuario en Firestore
import {
  createUserWithEmailAndPasswordFunction,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils.bckup";

// IMPORTACIONES DE COMPONENTES
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";

// =====================================================
// ESTADO INICIAL DEL FORMULARIO
// =====================================================
// Define los valores por defecto de todos los campos del formulario
const defaultFormFields = {
  displayName: "",      // Nombre que se mostrará en la app
  email: "",            // Email para autenticación
  password: "",         // Contraseña del usuario
  confirmPassword: "",  // Confirmación de contraseña
};

const SignUpForm = () => {
  // =====================================================
  // ESTADO LOCAL CON USESTATE
  // =====================================================
  // formFields: Almacena los valores actuales de todos los campos
  // setFormFields: Función para actualizar el estado
  const [formFields, setFormFields] = useState(defaultFormFields);
  
  // Desestructuramos los campos para acceso más fácil
  const { displayName, email, password, confirmPassword } = formFields;


  const { setCurrentUser } = useContext(UserContext);
  // =====================================================
  // FUNCIÓN: RESETEAR FORMULARIO
  // =====================================================
  // Restaura todos los campos a sus valores iniciales
  // Se llama después de un registro exitoso o error
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // =====================================================
  // FUNCIÓN: MANEJAR ENVÍO DEL FORMULARIO
  // =====================================================
  // Se ejecuta cuando el usuario hace submit del formulario
  // FLUJO:
  //   1. Valida que las contraseñas coincidan
  //   2. Crea el usuario en Firebase Auth
  //   3. Guarda datos adicionales en Firestore
  //   4. Maneja errores comunes
  const handleSubmit = async (event) => {
    // Previene el comportamiento por defecto del formulario (recargar página)
    event.preventDefault();
    
    // VALIDACIÓN: Verificar que ambas contraseñas sean iguales
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }
    
    try {
      // PASO 1: Crear usuario en Firebase Authentication
      // Retorna un objeto con la propiedad 'user' que contiene uid, email, etc.
      const { user } = await createUserWithEmailAndPasswordFunction(
        email,
        password
      );
      setCurrentUser(user);
      // PASO 2: Crear documento del usuario en Firestore
      // Guardamos el displayName adicional porque Auth solo guarda email/password
      await createUserDocumentFromAuth(user, { displayName });
      
      // Si llegamos aquí, el registro fue exitoso
      // El formulario se reseteará automáticamente
      resetFormFields();
      
    } catch (error) {
      // MANEJO DE ERRORES
      if (error.code === "auth/email-already-in-use") {
        // Error específico: El email ya está registrado
        alert("El correo ya está en uso");
      } else {
        // Cualquier otro error
        console.log("Error al crear el usuario", error);
      }
      // Limpiamos el formulario en caso de error
    }
  };

  // =====================================================
  // FUNCIÓN: MANEJAR CAMBIOS EN LOS INPUTS
  // =====================================================
  // Se ejecuta cada vez que el usuario escribe en cualquier campo
  // Actualiza el estado con el nuevo valor
  const handleChange = (event) => {
    // Extraemos el nombre del campo y su valor del evento
    // name: atributo 'name' del input (ej: "email", "password")
    // value: valor actual que escribió el usuario
    const { name, value } = event.target;
    
    // Actualizamos el estado manteniendo los valores anteriores (...formFields)
    // y sobrescribiendo solo el campo que cambió ([name]: value)
    // Ejemplo: Si name="email", esto actualiza formFields.email
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>¿No tienes una cuenta?
</h2>
      <span>Regístrate con tu correo electrónico y contraseña</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Nombre"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirmar Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Registrarse</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
