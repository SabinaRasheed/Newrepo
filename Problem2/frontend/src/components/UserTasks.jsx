import React, { useState, useEffect } from "react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const TasksPage = () => {

  // Fetch tasks from the backend
  

 

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <Typography variant="h3" component="h1" className="font-bold mb-6">
          Tasks
        </Typography>

      
      </div>
    </>
  );
};

export default TasksPage;
