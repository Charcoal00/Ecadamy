const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    classTitle: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Hashed password
});

module.exports = mongoose.model("User", userSchema);
