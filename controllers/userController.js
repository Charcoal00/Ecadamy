const bcrypt = require("bcrypt");
const User = require("../models/User");
exports.registerUser = async (req, res) => {
    const { phone, firstName, lastName, classTitle, email, password } = req.body;
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
    const { phone, password } = req.body;
    try {
        const user = await User.findOne({ phone });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.status(200).json({
                message: "Login successful",
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    classTitle: user.classTitle,
                    email: user.email,
                    phone: user.phone,
                },
            });
        } else {
            res.status(401).json({
                message: "Invalid Phonenumber and/or Password",
            });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Error during login" });
    }
};
