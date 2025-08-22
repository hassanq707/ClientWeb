const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const OrderRouter = require("./routes/order.js");
const cors = require("cors");
const connectDB = require("./config/DB.js");
const ORDER = require('./models/order.js')
const PAYMENT = require('./models/payment.js')

const app = express();
const port = process.env.PORT || 5000;

// Cors 

const allowedOrigins = [
  'http://localhost:5173',
  'https://fusion-test-sigma.vercel.app',
  'http://fusionscar.com',
  'https://fusionscar.com'
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
app.use(express.urlencoded({ extended: false }));

// Connect to DB
connectDB().then().catch();

// Routes
app.use('/orders', OrderRouter);

// Test route

app.get('/', async (req, res) => {
    res.send("Api is working.");
});


app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
