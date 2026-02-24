import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { access } = useContext(AuthContext);

  if (!access) {
    return <Navigate to="/login" replace />;
  }

  return children;
}