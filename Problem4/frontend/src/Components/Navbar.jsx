import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa"; // For the logout icon

const Navbar = () => {
  const navigate = useNavigate();

  // Retrieve user data from sessionStorage
  const user = JSON.parse(sessionStorage.getItem("userData")) || {};
  const { name, id, username } = user;

  // Function to handle logout
  const handleLogout = () => {
    sessionStorage.removeItem("userData"); // Remove user from sessionStorage
    navigate("/"); // Redirect to login page
  };

  // Generate profile picture using the first letter of the user's name
  const profileInitial = username ? username.charAt(0).toUpperCase() : "U"; // Default to 'U' for undefined names

  return (
    <AppBar position="sticky" className="bg-blue-600">
      <Toolbar className="flex justify-between items-center">
        {/* Logo and app name on the left */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          <Typography variant="h6" className="text-white font-bold">
            MyApp
          </Typography>
        </div>

        {/* User profile, avatar, and logout button on the right */}
        <div className="flex items-center space-x-4">
          {/* Profile description */}
          <div className="text-white text-sm text-right">
            <p className="font-semibold">{username}</p>
            <p className="text-xs">ID: {id}</p>
          </div>

          {/* Profile picture */}
          <Avatar
            alt="User Profile"
            className="bg-blue-500 text-white"
            sx={{ width: 40, height: 40 }}
          >
            {profileInitial}
          </Avatar>

          {/* Logout button */}
          <IconButton
            color="inherit"
            onClick={handleLogout}
            aria-label="logout"
          >
            <FaSignOutAlt className="text-white" />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
