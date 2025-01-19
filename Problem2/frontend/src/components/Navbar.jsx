import { useState, useEffect } from "react";
import { Menu, MenuItem, Button, Typography } from "@mui/material";
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
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Typography variant="h6" className="text-xl font-semibold">
        LOGO
      </Typography>
      <div className="flex items-center space-x-4">
        <Button
          variant="contained"
          color="secondary"
          endIcon={<ArrowDropDown />}
          onClick={handleMenuOpen}
        >
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
        <Button variant="outlined" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
