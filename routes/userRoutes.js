const express = require("express");
const {
    registerUser,
    loginUser,
    getUserData,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser", verifyToken, getUserData);

module.exports = router;
