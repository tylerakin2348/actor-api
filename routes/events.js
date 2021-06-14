const express = require("express");
const router = express.Router();
const ActingEvent = require("../models/event");

router.get("/", async (req, res) => {
  try {
    const ActingEvents = await ActingEvent.find();
    res.json(ActingEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getActingEvent, (req, res) => {
  res.send(res.event);
});

router.post("/", async (req, res) => {
  const actingEvent = new ActingEvent({
    event_name: req.body.event_name,
    event_company: req.body.event_company,
    event_url: req.body.event_url,
  });

  try {
    const newActingEvent = await actingEvent.save();
    res.status(201).json(newActingEvent);
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

router.delete("/:id", getActingEvent, async (req, res) => {
  try {
    await res.event.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getActingEvent(req, res, next) {
  let event;
  try {
    event = await ActingEvent.findById(req.params.id);

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
