import { useState, useEffect } from "react";
import { Menu, MenuItem, Button, Typography, Box } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("Available");

  const navigate = useNavigate();

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setStatus(parsedData.useravailability || "Available");
    }
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = async (newStatus) => {
    const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
    const userid = userData.userid;
    try {
      const response = await fetch("http://localhost:5000/api/userstatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid, newStatus }),
      });
      if (response.ok) {
        const updatedUserData = { ...userData, useravailability: newStatus };
        sessionStorage.setItem("userData", JSON.stringify(updatedUserData));
        setStatus(newStatus);
        setAnchorEl(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");
    const userid = userData.userid;

    try {
      const response = await fetch("http://localhost:5000/api/logout", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid }),
      });
      if (response.ok) {
        sessionStorage.removeItem("userData");
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 32px",
        background: "linear-gradient(90deg, #4e73df, #1cc88a)",
        color: "white",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "24px" }}>
        LOGO
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#f39c12",
            borderRadius: "24px",
            padding: "8px 16px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#e67e22",
            },
          }}
          endIcon={<ArrowDropDown />}
          onClick={handleMenuOpen}>
          {status}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleStatusChange("Available")}>
            Available
          </MenuItem>
          <MenuItem onClick={() => handleStatusChange("Busy")}>Busy</MenuItem>
          <MenuItem onClick={() => handleStatusChange("Away")}>Away</MenuItem>
        </Menu>
        <Button
          variant="outlined"
          sx={{
            borderRadius: "24px",
            padding: "8px 16px",
            borderColor: "#e74c3c",
            color: "#e74c3c",
            textTransform: "none",
            "&:hover": {
              borderColor: "#c0392b",
              backgroundColor: "#e74c3c",
              color: "white",
            },
          }}
          onClick={handleLogout}>
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Navbar;
