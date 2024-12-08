const express = require("express");
const { getAllUsers } = require("../controllers/adminController");
const { verifyAdminToken } = require("../middleware/auth");
const router = express.Router();

router.get("/users", verifyAdminToken, getAllUsers);

module.exports = router;