import express from "express";
import OrderRouter from "./routes/order.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;


const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};


// Middleware
app.use(cors(corsOptions));
app.use(express.json());

await connectDB()

// Routes
app.use('/orders', OrderRouter);

app.get('/',(req,res)=>{
  res.send("Api is Working...")
})

// Server startup
app.listen(port, () => {

  console.log(`Server is running on port http://localhost:${port}`);

});