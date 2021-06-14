const mongoose = require("mongoose");

const actingEventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  event_company: {
    type: String,
    required: true,
  },
  event_url: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ActingEvent", actingEventSchema);
