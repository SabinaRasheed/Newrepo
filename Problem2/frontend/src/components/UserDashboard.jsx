import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import { Heading } from "@radix-ui/themes";
import { useEffect, useState } from "react";


const Dashboard = () => {
  // Get user data from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem("userData") || "{}");


  const [tasks, setTasks] = useState([]);

  

  const navigate = useNavigate();


  const handleStartTask = (taskid) => {
    // Handle starting the task (e.g., navigate to task details page)
    console.log(`Starting task with ID: ${taskid}`);
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/tasks/${
          JSON.parse(sessionStorage.getItem("userData")).userid
        }`
      );

      if (response.ok) {
        const data = await response.json();
        setTasks(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const inv=setInterval(() => {
      
      fetchTasks();
    }, 3000);
    return ()=>clearInterval(inv)
  }, []);

  return (
    <>
      <Navbar />
 
<div className="flex flex-col items-center min-h-screen">


  <div className="container mx-auto p-8 flex flex-col items-center justify-center">
    {/* Dashboard Heading */}
    <Heading size={"8"} className="text-center">
      Dashboard
    </Heading>

    <Heading size={"5"} weight={"light"} className="text-center">
      Welcome back {userData.username}
    </Heading>

    <div className="flex flex-col space-y-6 w-full mt-10">
          {tasks&&tasks.map((task) => (
            <Card
              key={task.taskid}
              className="flex flex-row bg-white shadow-lg rounded-lg p-4"
            >
              <CardContent className="flex-1">
                <Typography variant="h6" className="font-semibold mb-2">
                  {task.tasktitle}
                </Typography>
                <Typography variant="body2" className="mb-4">
                  {task.taskdescription}
                </Typography>
                <Typography variant="body2" className="text-sm text-gray-600">
                  Deadline: {task.taskdeadline}
                </Typography>
              </CardContent>
              <CardActions className="flex flex-col justify-center items-center space-y-2">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleStartTask(task.taskid)}
                >
                  Start Task
                </Button>
              </CardActions>
            </Card>
          ))}
          {tasks.length==0&&<Typography variant="h6" align="center" className="text-md text-gray-600">
            No tasks for now
                </Typography>}
        </div>
  </div>
</div>
</>

  );
};

export default Dashboard;
