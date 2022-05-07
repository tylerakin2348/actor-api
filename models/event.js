const mongoose = require("mongoose");

const actingEventSchema = new mongoose.Schema({
  event_name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  description: {
    type: String,
  },
  event_date: {
    type: Date,
    default: null,
  },
  start_date: {
    type: Date,
    default: null,
  },
  end_date: {
    type: Date,
    default: null,
  },
  event_company: {
    type: String,
    required: true,
  },
  event_url: {
    type: String,
  },
});

module.exports = mongoose.model("ActingEvent", actingEventSchema);
