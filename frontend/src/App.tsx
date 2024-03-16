import { AddProduct } from "./components/component/add-product";
import { Login } from "./components/component/login";
import Navbar from "./components/component/navbar";
import ProductInformation from "./components/component/product-information";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register } from "./components/component/register";
import { OrderDetails } from "./components/component/order-details";
import { OrderTable } from "./components/component/order-table";
import Products from "./components/component/products";
import { Checkout } from "./components/component/checkout";
import { Profile } from "./components/component/profile";
import { CategoriesCrud } from "./components/component/categories-crud";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Navbar />}>
          <Route path="add-product" element={<AddProduct />} />
          <Route path="categories-crud" element={<CategoriesCrud />} />
          <Route path="product/:productId" element={<ProductInformation />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="product" element={<Products />} />
          <Route path="order" element={<OrderTable />} />
          <Route path="order/:orderId" element={<OrderDetails />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
