require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors")

const otpRoutes = require("./routes/otpRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(bodyParser.json());
app.use(cors());
// app.use(cors({
//     origin: 'http://127.0.0.1:5500',
//     methods:['GET', 'POST'],
//     credentials: true,
// }))



// Connect to MongoDB

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("DB connection error:", err));

// Routes
app.use("/api/otp", otpRoutes);
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
