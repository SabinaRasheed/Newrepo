import React, { useState } from "react";
import axios from "axios";
import { Typography, TextField, Button, Box } from "@mui/material";

const Login = ({ setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", { username, password });
      const { role } = response.data;
      setUserRole(role);
      if (role === "agent") {
        window.location.href = "/agent-dashboard";
      } else if (role === "admin") {
        window.location.href = "/admin-dashboard";
      }
    } catch (err) {
      console.error("Login failed", err);
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
