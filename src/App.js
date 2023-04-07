import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Buy from "./pages/Buy";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Sale from "./pages/Sale";
import SignIn from "./pages/SignIn";
import SIngleProduct from "./pages/SIngleProduct";
import Account from "./pages/Account";
import Messages from "./pages/Messages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<SignIn />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/singleProduct" element={<SIngleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
