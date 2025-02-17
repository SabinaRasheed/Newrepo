import { useState } from "react";
import { Box, Button, TextField, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Heading } from "@radix-ui/themes"
import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const data = await response.json();
        // Use sessionStorage instead of Cookies
        sessionStorage.setItem("userData", JSON.stringify(data)); // Store the user data in sessionStorage
  
        toast.success("Login successful!", {
          position: "top-center" // Fixed toast positioning
        });
  
        if (data.userrole === "User") {
          navigate("/userdashboard");
        } else if (data.userrole === "Manager") {
          navigate("/admindashboard");
        }
      } else {
        // Show error toast if login fails
        toast.error("Incorrect email or password. Please try again.",{position: "top-center"});
      }
  
    } catch (err) {
      console.error(err);
      toast.error("An error occurred. Please try again.");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Container maxWidth="xs">
        <Box
          className="bg-white shadow-lg rounded-lg p-8"
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Heading>Login</Heading>
          <Box component="form" onSubmit={handleSubmit} className="w-full mt-4">
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={formData.email}
              onChange={handleChange}
              className="mb-4"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className="mb-6"

            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Login
            </Button>
          </Box>
        </Box>
      </Container>
    </div>

  );
};

export default LoginForm;
