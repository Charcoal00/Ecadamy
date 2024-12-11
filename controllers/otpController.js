const { sendOtp } = require("../utils/sendchampService");
const User = require("../models/User");
const otpStore = new Map();

exports.sendOtp = async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
        return res
            .status(400)
            .json({ succes: false, message: "This phonenumber is invalid" });
    }
    const user = await User.findOne({ phone });
    if (user) {
        return res
            .status(200)
            .json({ success: true, message: "This phonenumber already exist" });
    }
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        otpStore.set(phone, otp);

        await sendOtp(phone, otp);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to send OTP" });
    }
};

exports.verifyOtp = (req, res) => {
    const { phone, otp } = req.body;

    if (otpStore.get(phone) === otp) {
        otpStore.delete(phone);
        res.status(200).json({ message: "OTP verified successfully" });
    } else {
        res.status(400).json({ message: "Invalid OTP" });
    }
};
