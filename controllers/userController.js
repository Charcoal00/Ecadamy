const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    const { phone, firstName, lastName, classTitle, email, password } =
        req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            phone,
            firstName,
            lastName,
            classTitle,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "Registiration is successful" });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Error during registration" });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { phone, password } = req.body;
        const user = await User.findOne({ phone });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            return res.status(401).json({ message: "Invalid Username and/or Password" });

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        // console.log("Generated Token:", token);
        res.json({
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getUserData = async (req, res) => {
    try {
        if (!req.user)
            return res.status(404).json({ message: "User not found" });

        res.status(200).json({
            message: "User data retrieved successfully",
            user: req.user,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
