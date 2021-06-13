const express = require("express");
const router = express.Router();
const Event = require("../models/event");

router.get("/", async (req, res) => {
  try {
    const Events = await Event.find();
    res.json(Events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getEvent, (req, res) => {
  res.send(res.event);
});

router.post("/", async (req, res) => {
  const Event = new Event({
    event_name: req.body.event_name,
    event_company: req.body.event_company,
    event_url: req.body.event_url,
  });

  try {
    const newEvent = await Event.save();
    res.status(201).json(newEvent);
    console.log("in try");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", (req, res) => {
  if (req.body.role !== null) {
    res.event.role = req.body.role;
  }
});

router.delete("/:id", getEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getEvent(req, res, next) {
  let event;
  try {
    event = await Event.findById(req.params.id);

    if (event === null) {
      return res.status(404).json({ message: "Cannot Find Event" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.event = event;
  next();
}

module.exports = router;
