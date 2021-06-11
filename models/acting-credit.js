const mongoose = require("mongoose");

const actingCreditSchema = new mongoose.Schema({
  show_role: {
    type: String,
    required: true,
  },
  show_company_name: {
    type: String,
    required: true,
  },
  show_director_name: {
    type: String,
    required: true,
  },
  show_title: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ActingCredit", actingCreditSchema);
