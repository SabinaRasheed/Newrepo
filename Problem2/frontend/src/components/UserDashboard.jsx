import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";

const Dashboard = () => {
  // Get user data from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");

  const navigate = useNavigate();

  const handleGoToTasks = () => {
    navigate("/tasks");
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        {/* Dashboard Heading */}
        <Typography variant="h3" component="h1" className="font-bold mb-4">
          Dashboard
        </Typography>

        {/* Welcome Message */}
        <Typography variant="h5" className="text-xl mb-6">
          Hello, {userData.username}!
        </Typography>

        {/* Button to View Tasks */}
        <Button
          onClick={handleGoToTasks}
          variant="contained"
          color="primary"
          className="px-6 py-3"
        >
          View Assigned Tasks
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
