const mongoose =  require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/ClientWeb`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error.message);
        process.exit(1); 
    }
};

mongoose.connection.on("connected", () => {
    console.log("🟢 Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
    console.error("🔴 Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
    console.log("🟡 Mongoose disconnected from DB");
});

module.exports = connectDB