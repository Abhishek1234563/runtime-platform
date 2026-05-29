import express from "express";
import cors from "cors";
import runtimeRoutes from "./routes/runtimeRoutes";
import authRoutes
from "./routes/authRoutes";
import configRoutes
from "./routes/configRoutes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/config", configRoutes);

app.use("/api/runtime", runtimeRoutes);
app.get("/", (req, res) => {
  res.send("Backend Runtime API Working");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});