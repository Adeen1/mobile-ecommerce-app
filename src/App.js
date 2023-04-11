import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Buy from "./pages/Buy";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Sale from "./pages/Sale";
import SIngleProduct from "./pages/SIngleProduct";
import Account from "./pages/Account";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/Sale" element={<Sale />} />
        <Route path="/Buy" element={<Buy />} />
        <Route path="/singleProduct" element={<SIngleProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
