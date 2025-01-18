import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());

// Use body-parser middleware to parse JSON request bodies
app.use(express.json());
// Use the routes
app.use("/api", userRoutes);
app.use("/api", taskRoutes);

// Set up the server to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
