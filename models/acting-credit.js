const mongoose = require("mongoose");

const actingCreditSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  show: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ActingCredit", actingCreditSchema);
