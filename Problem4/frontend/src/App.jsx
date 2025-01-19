import { BrowserRouter, Route, Routes, Navigate, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Login from "./Components/Login";
import AgentDashboard from "./Components/AgentDashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [userRole, setUserRole] = useState(null)


  const ProtectedRoute = ({ children }) => {
  const navigate=useNavigate()

  useEffect(() => {
    // Retrieve user data from sessionStorage
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    
    // Set the user role if available
    if (userData) {
      setUserRole(userData.role);
    }
  }, []);

    if (!userRole) {
      navigate("/")
    }
    return children;
  };

  return (<>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/agent-dashboard"
          element={
            <ProtectedRoute>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    <ToastContainer />
    </>
  );
};

export default App;
