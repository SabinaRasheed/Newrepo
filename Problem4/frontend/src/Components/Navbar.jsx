import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Box, Menu, MenuItem, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Navbar = () => {
  const navigate = useNavigate();

  const user = JSON.parse(sessionStorage.getItem("userData")) || {};
  const { id, name, username } = user; 
  const profileInitial = username ? username.charAt(0).toUpperCase() : "U";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userData");
    navigate("/");
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "linear-gradient(135deg, #5e81f4, #4a70d1)", 
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
        
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3 }}>
        <Box display="flex" alignItems="center" gap={1}>
          <img
            src="/logo.png"
            alt="Logo"
            style={{
              width: 40,
              height: 40,
              borderRadius: "8px",
            }}
          />
          <Typography
            variant="h5"
            sx={{
              color: "#ffffff",
              fontWeight: "bold",
              letterSpacing: "1px",
              textShadow: "1px 1px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            MyApp
          </Typography>
        </Box>

        {/* User Profile Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box sx={{ textAlign: "right", color: "white", "&:hover": { cursor: "pointer" } }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: 600,
                textTransform: "capitalize",
              }}
            >
              {username || "Guest"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                opacity: 0.7,
                fontStyle: "italic",
              }}
            >
              Welcome,
            </Typography>
          </Box>

          <Avatar
            sx={{
              bgcolor: "#FF6F00",
              width: 48,
              height: 48,
              border: "2px solid white",
              fontWeight: "bold",
              boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Add subtle shadow
            }}
          >
            {profileInitial}
          </Avatar>

          {/* Menu Button */}
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            sx={{
              "&:hover": {
                backgroundColor: "transparent", // Clean hover
              },
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{
          "& .MuiMenu-paper": {
            borderRadius: "12px", // Rounded menu
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)", // Subtle shadow
          },
          "& .MuiMenuItem-root": {
            fontWeight: 500,
            borderRadius: "8px", // Rounded menu items
          },
        }}
      >
        <MenuItem disabled sx={{ fontWeight: 600 }}>
          {name || "User"}
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "#D32F2F",
            "&:hover": {
              backgroundColor: "rgba(211, 47, 47, 0.1)", // Subtle hover effect
            },
          }}
        >
          <FaSignOutAlt /> Logout
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default Navbar;
