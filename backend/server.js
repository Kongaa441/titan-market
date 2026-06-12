const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { connectDeriv } = require("./api/api");

const botRoutes = require("./routes/bots");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/bots", botRoutes);
app.use("/api/auth", authRoutes);

// Home Route
app.get("/", (req, res) => {
  res.send("TradeHub Backend Running...");
});

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "Backend Running"
  });
});

// Connect Deriv Automatically
connectDeriv();

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});