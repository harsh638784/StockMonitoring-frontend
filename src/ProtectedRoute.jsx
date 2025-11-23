// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = document.cookie.includes("token="); // ya global state se check
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
