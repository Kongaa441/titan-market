const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log(
  "Deriv token loaded:",
  process.env.DERIV_API_TOKEN ? "YES" : "NO"
);

const { connectDeriv } = require("./api/api");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Bots Route
const botRoutes = require("./routes/bots");
app.use("/api/bots", botRoutes);

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
  console.log(`🚀 Server running on port ${PORT}`);
});
// Bots Route
const botRoutes = require("./routes/bots");
app.use("/api/bots", botRoutes);

// Auth Route
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);