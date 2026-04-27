import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProtectedRoute from "./ProtectedRoute";




function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
<Routes>
  <Route path="/" element={<Navigate to="/register" replace />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

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