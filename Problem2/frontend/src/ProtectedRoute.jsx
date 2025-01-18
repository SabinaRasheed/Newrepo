// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }) => {
  const userData = Cookies.get("userData");

  // If no userData cookie exists, redirect to login
  if (!userData) {
    return <Navigate to="/login" replace />;
  }

  // If userData exists, render the protected component
  return children;
};

export default ProtectedRoute;
