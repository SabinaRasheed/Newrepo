import React, { useState } from "react";
import { Typography, TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Login = ({  }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include", // To include cookies (session)
      });
  
      const data = await response.json(); // Parse the response JSON
  
      if (response.ok) {
        // Login successful
        console.log(data.user);
        sessionStorage.setItem("userData", JSON.stringify(data.user));
  
        const { role } = data.user;
        toast.success("Login successful!", {
          position: "top-center", // Fixed toast positioning
        });
  
        if (role === "agent") {
          window.location.href = "/agent-dashboard";
        } else if (role === "admin") {
          window.location.href = "/admin-dashboard";
        }
      } else {
        // Login failed - Display error from backend response
        if (data.message) {
          toast.error(data.message, {
            position: "top-center", // Fixed toast positioning
          });
        } else {
          toast.error("Login failed. Please try again.", {
            position: "top-center",
          });
        }
      }
    } catch (err) {
      console.error("Error during login", err);
      toast.error("Something went wrong. Please try again later.", {
        position: "top-center", // Fixed toast positioning
      });
    }
  };
  

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#fafafa",
        padding: 2,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
          boxShadow: 1,
          backgroundColor: "#ffffff",
          overflow: "hidden",
          padding: 4,
        }}
      >
        <Typography
          variant="h5"
          component="div"
          textAlign="center"
          gutterBottom
          sx={{
            fontWeight: 600,
            color: "#333333",
          }}
        >
          Welcome Back
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="textSecondary"
          sx={{ marginBottom: 2 }}
        >
          Please log in to continue
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
              },
            }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                marginTop: 2,
                padding: "10px 0",
                fontWeight: "bold",
                borderRadius: "8px",
                backgroundColor: "#5e81f4",
                "&:hover": {
                  backgroundColor: "#4a70d1",
                },
              }}
            >
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
