const express = require("express");
const contacts = require("../../controllers/contacts");
const router = express.Router();

router.get("/", contacts.listContacts);

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", contacts.addContact);

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
