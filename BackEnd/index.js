import express from "express";
import OrderRouter from "./routes/order.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/DB.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Cors 

const allowedOrigins = [
  'http://localhost:5173',
  'https://fusion-test-sigma.vercel.app'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Connect to DB
await connectDB();

// Routes
app.use('/orders', OrderRouter);

// Test route
app.get('/', (req, res) => {
  res.send("API is working...");
});

// Server start
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
