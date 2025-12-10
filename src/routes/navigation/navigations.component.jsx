import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { UserContext } from "../../components/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
// import {ReactComponent as Logo} from '../../assets/crown.svg'; => unicamente con archivos .svg
import logoSrc from "../../assets/logo.png";
import "./navigations.styles.scss";
import CartIcon from "../../components/cart-icon/cart-icon.component.jsx";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.jsx";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          {/* <Logo className="logo"/>=Unicamente con archivos .svg */}
          <img src={logoSrc} alt="Logo" className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            TIENDA
          </Link>
          <Link className="nav-link" to="/contact">
            CONTACTO
          </Link>

          {currentUser ? (
            <span className="nav-link" onClick={signOutUser}>
              Cerrar Sesión
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              Iniciar Sesión
            </Link>
          )}
          <CartIcon />
        </div>
        <CartDropdown/>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
