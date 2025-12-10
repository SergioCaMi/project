import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";

import { UserContext } from "../../components/context/user.context";
import { CartContext } from "../../components/context/cart.context.jsx";

import { signOutUser } from "../../utils/firebase/firebase.utils";
// import {ReactComponent as Logo} from '../../assets/crown.svg'; => unicamente con archivos .svg
import logoSrc from "../../assets/logo.png";

import "./navigations.styles.scss";

import CartIcon from "../../components/cart-icon/cart-icon.component.jsx";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.jsx";

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);
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
              CERRAR SESIÓN
            </span>
          ) : (
            <Link className="nav-link" to="/auth">
              INICIAR SESIÓN
            </Link>
          )}
          <CartIcon />
        </div>
        {isCartOpen && <CartDropdown />}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
