import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const ManagerDashboard = () => {
  // Get the user data from sessionStorage
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchUsers();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenDialog = (user) => {
    if (
      user.useravailability !== "Available" &&
      window.confirm(
        "User is not available. Do you still want to assign the task?"
      ) === false
    ) {
      return;
    }
    setSelectedUser(user.userid);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline("");
  };

  const handleAssignTask = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/assigntask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedUser,
          taskTitle,
          taskDescription,
          taskDeadline,
        }),
      });
      if (response.ok) {
        console.log("Task Assigned Successfully");
        handleCloseDialog();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-8">
        <Typography variant="h3" component="h1" className="font-bold mb-4">
          Manager Dashboard
        </Typography>

        <TableContainer className="mb-8">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className="font-semibold">ID</TableCell>
                <TableCell className="font-semibold">Name</TableCell>
                <TableCell className="font-semibold">
                  Availability Status
                </TableCell>
                <TableCell className="font-semibold">Location</TableCell>
                <TableCell className="font-semibold">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userid}>
                  <TableCell>{user.userid}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.useravailability}</TableCell>
                  <TableCell>{user.userlocation}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(user)}
                    >
                      Assign Task
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Assign Task</DialogTitle>
          <DialogContent>
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
            />
            <TextField
              label="Task Description"
              variant="outlined"
              fullWidth
              className="mb-4"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              multiline
              rows={4}
            />
            <TextField
              variant="outlined"
              fullWidth
              type="date"
              className="mb-4"
              value={taskDeadline}
              onChange={(e) => setTaskDeadline(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleAssignTask} color="primary">
              Assign Task
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ManagerDashboard;
