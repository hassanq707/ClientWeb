const mongoose = require("mongoose");
const moment = require('moment-timezone');

const vinorderSchema = new mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    vinNumber: {
        type: String,
        unique: true
    },
    vehicleModel: {
        type: String
    },
    year: {
        type: String
    },
    paymentStatus: {
        type: String,
        default: "pending",
        enum: ["pending", "confirmed", "failed"]
    },
    Date: {
        type: String,
        default: () =>
        moment().tz('Asia/Karachi').format('DD/MM/YYYY, hh:mm A')
    }
})



const ORDER = mongoose.model("Orders", vinorderSchema)


module.exports = ORDER

