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
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
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
    fetchTasks();
  }, []);

  const handleStartTask = (taskid) => {
    // Handle starting the task (e.g., navigate to task details page)
    console.log(`Starting task with ID: ${taskid}`);
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-8">
        <Typography variant="h3" component="h1" className="font-bold mb-6">
          Tasks
        </Typography>

        <div className="flex flex-col space-y-6">
          {tasks.map((task) => (
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
        </div>
      </div>
    </>
  );
};

export default TasksPage;
