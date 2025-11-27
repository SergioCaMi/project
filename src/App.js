import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./components/navigation/navigations.component";

const Shop = () => {
  return (
    <div className="shop-page">
      <h1>Tienda</h1>
      <p>¡Bienvenido a nuestra sección de productos!</p>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
