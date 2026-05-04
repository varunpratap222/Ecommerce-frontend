import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProtectedRoute from "./ProtectedRoute";
import AdminLogin from "./admin/AdminLogin";
import AdminProducts from "./admin/AdminProducts";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";



function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
<Routes>
  <Route path="/" element={<Navigate to="/login" replace />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />
  <Route path="/admin-login" element={<AdminLogin />} />
  <Route path="/admin/products" element={<AdminProducts />} />
  <Route path="/product/:id" element={<ProductDetails />} />
  <Route path="/cart" element={<Cart />} />
  

  <Route
    path="/products"
    element={
      <ProtectedRoute>
        <Products />
      </ProtectedRoute>
    }
  />
</Routes>
    
  );
}

export default App;