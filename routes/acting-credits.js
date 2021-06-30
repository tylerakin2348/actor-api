const express = require("express");
const router = express.Router();
const ActingCredit = require("../models/acting-credit");

router.get("/", async (req, res) => {
  try {
    const actingCredits = await ActingCredit.find();
    res.json(actingCredits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getActingCredit, (req, res) => {
  res.send(res.acting_credit);
});

router.post("/", async (req, res) => {
  const actingCredit = new ActingCredit({
    show_title: req.body.show_title,
    show_role: req.body.show_role,
    show_director_name: req.body.show_director_name,
    show_company_name: req.body.show_company_name,
    // role: req.body.role,
    // company: req.body.company,
    // show: req.body.show,
  });

  try {
    const newActingCredit = await actingCredit.save();
    res.status(201).json(newActingCredit);
    console.log("in try");
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", (req, res) => {
  if (req.body.role !== null) {
    res.acting_credit.role = req.body.role;
  }
});

router.delete("/:id", getActingCredit, async (req, res) => {
  try {
    await res.acting_credit.remove();
    res.json({ message: "Deleted Subscriber" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

async function getActingCredit(req, res, next) {
  let acting_credit;
  try {
    acting_credit = await ActingCredit.findById(req.params.id);

    if (acting_credit === null) {
      return res.status(404).json({ message: "Cannot Find Acting Credit" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.acting_credit = acting_credit;
  next();
}

module.exports = router;
