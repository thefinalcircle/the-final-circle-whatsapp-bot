const express = require("express");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// Home page
app.get("/", (req, res) => {
  res.status(200).send("THE FINAL CIRCLE WhatsApp Bot is LIVE 🚀");
});

// Meta webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified successfully!");
    return res.status(200).send(challenge);
  }

  console.log("Webhook verification failed.");
  return res.sendStatus(403);
});

// Receive webhook messages
app.post("/webhook", (req, res) => {
  console.log("Webhook received:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`THE FINAL CIRCLE Bot running on port ${PORT}`);
});
