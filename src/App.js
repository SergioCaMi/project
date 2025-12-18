import { Route, Routes } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigations.component";
import SignIn from "./routes/authtentication/authtentication.components";
import Contact from "./routes/contact/contact.component copy";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />}></Route>
        <Route path="shop/*" element={<Shop />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="auth" element={<SignIn />}></Route>
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
