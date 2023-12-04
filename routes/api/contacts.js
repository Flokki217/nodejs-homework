const express = require("express");
const controller = require("../../controllers/contacts");

const isValidID = require("../../middlewares/validation");

const router = express.Router();

router.get("/", controller.get);

router.get("/:contactId", isValidID, controller.getByID);

router.delete("/:contactId", isValidID, controller.remove);

router.post("/", controller.create);

router.put("/:contactId", isValidID, controller.update);

router.patch("/:contactId", isValidID, controller.updateFavorite);

module.exports = router;
