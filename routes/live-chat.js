const express = require("express");
const router = express.Router();
const LiveChat = require("../models/live-chat");

router.get("/", async (req, res) => {
  try {
    const LiveChats = await LiveChat.find();
    res.json(LiveChats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getLiveChat, (req, res) => {
  res.send(res.live_chat_message);
});

router.post("/", async (req, res) => {
  const liveChat = new LiveChat({
    message: req.body.message,
    message_author: req.body.message_author,
  });

  try {
    const newLiveChat = await liveChat.save();
    res.status(201).json(newLiveChat);
    console.log("in try");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", getLiveChat, (req, res) => {
  try {
    LiveChat.findByIdAndUpdate(req.params.id, req.body, function(err, live_chat) {
      res.send('updated')
    }) 
   } catch {
 
   }
});

router.delete("/:id", getLiveChat, async (req, res) => {
  try {
    await res.live_chat_message.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getLiveChat(req, res, next) {
  let live_chat_message;
  try {
    live_chat_message = await LiveChat.findById(req.params.id);

    if (live_chat_message === null) {
      return res.status(404).json({ message: "Cannot Find Event" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.live_chat_message = live_chat_message;
  next();
}

module.exports = router;
