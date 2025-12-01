import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
// import {ReactComponent as Logo} from '../../assets/crown.svg'; => unicamente con archivos .svg
import logoSrc from '../../assets/logo.png';
import './navigations.styles.scss';

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
            {/* <Logo className="logo"/>=Unicamente con archivos .svg */}
            <img src={logoSrc} alt="Logo" className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className='nav-link' to="/shop">TIENDA</Link>
          <Link className='nav-link' to="/">CONTACTO</Link>
          <Link className='nav-link' to="/auth">REGISTRARSE</Link>{" "}
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
