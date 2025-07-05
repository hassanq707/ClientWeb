import mongoose from "mongoose";

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
        default: () => {
            const now = new Date();
            const date = now.toLocaleDateString("en-GB"); 
            const time = now.toLocaleTimeString("en-US");
            return `${date}, ${time}`;
        }
    }

})



const ORDER = mongoose.model("Orders", vinorderSchema)


export default ORDER

