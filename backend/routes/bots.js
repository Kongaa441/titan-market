const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const botsFile = path.join(__dirname, "../data/bots.json");

// helpers
const getBots = () => JSON.parse(fs.readFileSync(botsFile, "utf-8"));
const saveBots = (data) =>
  fs.writeFileSync(botsFile, JSON.stringify(data, null, 2));

/**
 * CREATE BOT
 */
router.post("/create", (req, res) => {
  const { userId, name, symbol, stake, strategy } = req.body;

  const bots = getBots();

  const newBot = {
    id: Date.now(),
    userId,
    name,
    symbol,
    stake,
    strategy,
    status: "stopped",
    createdAt: new Date()
  };

  bots.push(newBot);
  saveBots(bots);

  res.json({
    message: "Bot created successfully",
    bot: newBot
  });
});

/**
 * GET ALL BOTS (for user)
 */
router.get("/", (req, res) => {
  const { userId } = req.query;

  const bots = getBots();

  const userBots = bots.filter(b => b.userId == userId);

  res.json(userBots);
});

/**
 * DELETE BOT
 */
router.delete("/:id", (req, res) => {
  const bots = getBots();

  const filtered = bots.filter(b => b.id != req.params.id);

  saveBots(filtered);

  res.json({ message: "Bot deleted" });
});

module.exports = router;
/**
 * START BOT
 */
router.post("/start/:id", (req, res) => {
  const bots = getBots();

  const bot = bots.find(b => b.id == req.params.id);

  if (!bot) return res.status(404).json({ message: "Bot not found" });

  bot.status = "running";
  saveBots(bots);

  res.json({ message: "Bot started", bot });
});

/**
 * STOP BOT
 */
router.post("/stop/:id", (req, res) => {
  const bots = getBots();

  const bot = bots.find(b => b.id == req.params.id);

  if (!bot) return res.status(404).json({ message: "Bot not found" });

  bot.status = "stopped";
  saveBots(bots);

  res.json({ message: "Bot stopped", bot });
});