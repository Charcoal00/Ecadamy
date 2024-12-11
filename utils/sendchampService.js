const axios = require("axios");

const sendOtp = async (phone, otp) => {
    const url = "https://api.sendchamp.com/api/v1/sms/send";
    const data = {
        to: phone, 
        message: `Your OTP is ${otp}`,
        sender_name: "Sendchamp", 
        route: "dnd", //delivery route
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${process.env.SENDCHAMP_PUBLIC_KEY}`,
            },
        });
        console.log("Sendchamp Response:", response.data);
        return response.data;
    } catch (error) {
        if (error.response) {
            console.error("Sendchamp API Error:", error.response.data);
            throw new Error(
                error.response.data.message || "Sendchamp API request failed"
            );
        } else if (error.request) {
            console.error("No response from Sendchamp:", error.request);
            throw new Error("No response from Sendchamp API");
        } else {
            console.error("Error in request setup:", error.message);
            throw new Error("Error in sending OTP");
        }
    }
};

module.exports = { sendOtp };
