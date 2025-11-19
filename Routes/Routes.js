const express = require("express");
const router = express.Router();

const UserMembershipController = require("../Controllers/Controllers");

router.post("/", UserMembershipController.create);
router.get("/", UserMembershipController.getAll);
router.get("/:id", UserMembershipController.getById);

// Reduce one session
router.put("/reduce-session/:id", UserMembershipController.reduceSession);

// Delete membership
router.delete("/:id", UserMembershipController.delete);

module.exports = router;
