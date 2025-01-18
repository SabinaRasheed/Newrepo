import express from "express";
import cors from "cors";
import accounts from "./routes/accounts.js";
import clients from "./routes/clients.js";

const app = express();

app.use(cors());

// Use body-parser middleware to parse JSON request bodies
app.use(express.json());
// Use the routes
app.use("/api", accounts);
app.use("/api", clients);

// Set up the server to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
