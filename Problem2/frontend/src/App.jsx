import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./ProtectedRoute";
import TasksPage from "./components/UserTasks";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/userdashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <ProtectedRoute>
              <TasksPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admindashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
