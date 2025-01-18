import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { Heading } from "@radix-ui/themes";


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
        <Heading size={"8"}>Dashboard</Heading>


        <Heading size={"5"} weight={"light"}>Welcome back {userData.username}</Heading>


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
