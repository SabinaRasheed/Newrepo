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

import { toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const ManagerDashboard = () => {
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  console.log(userData);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDeadline, setTaskDeadline] = useState("");
  const [users, setUsers] = useState([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState(false);

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
    if (user.useravailability !== "Available") {
      setSelectedUser(user);
      setOpenConfirmationDialog(true);
    } else {
      setSelectedUser(user);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setTaskTitle("");
    setTaskDescription("");
    setTaskDeadline("");
  };

  const handleCloseConfirmationDialog = () => {
    setOpenConfirmationDialog(false);
    setSelectedUser(null);
  };

  const handleConfirmAssignTask = () => {
    setOpenConfirmationDialog(false);
    setOpenDialog(true);
  };

  const handleAssignTask = async () => {
    if(!taskTitle||!taskDescription||!taskDeadline){
      toast.error("All fields required",{position:"top-center"})
      return
    }
    try {
      const response = await fetch("http://localhost:5000/api/assigntask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedUser: selectedUser.userid,
          taskTitle,
          taskDescription,
          taskDeadline,
        }),
      });
      if (response.ok) {
        console.log("Task Assigned Successfully");
        toast.success("Task assigned successfully!", {
          position: "top-center" // Fixed toast positioning
        });
        handleCloseDialog();
      }
      else{

        toast.error("Error while adding task. Try again later",{position: "top-center"});
      }

    } catch (err) {
      toast.error("Error while adding task. Try again later",{position: "top-center"});

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

        <TableContainer sx={{ boxShadow: 3, borderRadius: "8px", overflow: "hidden" }} className="mt-8">
          <Table sx={{ minWidth: 650 }}>
            <TableHead sx={{ backgroundColor: "#1976d2", color: "#fff" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>ID</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>
                  Availability Status
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Location</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "#fff" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.userid} sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                  <TableCell>{user.userid}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.useravailability}</TableCell>
                  <TableCell>{user.userlocation}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenDialog(user)}
                      sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": { backgroundColor: "#1565c0" },
                      }}
                    >
                      Assign Task
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

{/* Task Assignment Dialog */}
<Dialog
  open={openDialog}
  onClose={handleCloseDialog}
  sx={{
    "& .MuiDialog-paper": {
      padding: "24px",
      borderRadius: "12px",
      boxShadow: "0 6px 24px rgba(0, 0, 0, 0.15)",
      backgroundColor: "#ffffff",
      width: "400px",  // Increased width for better appearance
    },
  }}
>
  <DialogTitle sx={{ fontSize: "1.6rem", fontWeight: "600", textAlign: "center", color: "#333" }}>
    Assign Task
  </DialogTitle>
  <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
    <TextField
      label="Task Title"
      variant="outlined"
      fullWidth
      required
      value={taskTitle}
      onChange={(e) => setTaskTitle(e.target.value)}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ddd" },
        },
      }}
    />
    <TextField
      label="Task Description"
      variant="outlined"
      fullWidth
      value={taskDescription}
      onChange={(e) => setTaskDescription(e.target.value)}
      multiline
      required
      rows={4}
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ddd" },
        },
      }}
    />
    <TextField
      variant="outlined"
      fullWidth
      type="date"
      value={taskDeadline}
      onChange={(e) => setTaskDeadline(e.target.value)}
      required
      sx={{
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#ddd" },
        },
      }}
    />
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center", gap: "16px" }}>
    <Button
      onClick={handleCloseDialog}
      color="secondary"
      sx={{
        width: "160px", // Ensured button width consistency
        fontSize: "1rem", // Ensured text size consistency
        borderRadius: "8px",
        backgroundColor: "#f44336",
        "&:hover": { backgroundColor: "#d32f2f" },
        color: "#fff",
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleAssignTask}
      color="primary"
      sx={{
        width: "160px", // Ensured button width consistency
        fontSize: "1rem", // Ensured text size consistency
        borderRadius: "8px",
        backgroundColor: "#4CAF50",
        "&:hover": { backgroundColor: "#388e3c" },
        color: "#fff",
      }}
    >
      Assign Task
    </Button>
  </DialogActions>
</Dialog>

{/* Confirmation Dialog for Unavailable User */}
<Dialog open={openConfirmationDialog} onClose={handleCloseConfirmationDialog}>
  <DialogTitle sx={{ fontSize: "1.4rem", fontWeight: "600", textAlign: "center", color: "#333" }}>
    User is unavailable
  </DialogTitle>
  <DialogContent>
    <Typography sx={{ color: "#333", fontSize: "1rem" }}>
      The user is not available. Do you still want to assign the task?
    </Typography>
  </DialogContent>
  <DialogActions sx={{ justifyContent: "center", gap: "16px" }}>
    <Button
      onClick={handleCloseConfirmationDialog}
      color="secondary"
      sx={{
        width: "160px", // Ensured button width consistency
        fontSize: "1rem", // Ensured text size consistency
        borderRadius: "8px",
        backgroundColor: "#f44336",
        "&:hover": { backgroundColor: "#d32f2f" },
        color: "#fff",
      }}
    >
      Cancel
    </Button>
    <Button
      onClick={handleConfirmAssignTask}
      color="primary"
      sx={{
        width: "160px", // Ensured button width consistency
        fontSize: "1rem", // Ensured text size consistency
        borderRadius: "8px",
        backgroundColor: "#4CAF50",
        "&:hover": { backgroundColor: "#388e3c" },
        color: "#fff",
      }}
    >
      Yes, Proceed
    </Button>
  </DialogActions>
</Dialog>

      </div>
    </div>
  );
};

export default ManagerDashboard;
