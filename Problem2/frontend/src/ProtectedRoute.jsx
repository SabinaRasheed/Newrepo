/* eslint-disable react/prop-types */
// ProtectedRoute.js
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userData = sessionStorage.getItem("userData");

  // If no userData exists in sessionStorage, redirect to login
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // If userData exists, render the protected component
  return children;
};

export default ProtectedRoute;