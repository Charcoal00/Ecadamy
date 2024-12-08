const User = require("../models/User");
const getAllUsers = async (res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json({ users });
    } catch (error) {
        res.status(500).json({
            message: "error fetching user",
            error: error.message,
        });
    }
};
module.exports = getAllUsers;
