import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*", 
    credentials: true
}));

// Koneksi Database - Lazy connection (hanya connect saat ada request)
let isConnected = false;
const ensureDBConnection = async () => {
    if (!isConnected) {
        await connectDB();
        isConnected = true;
    }
};

// Middleware untuk ensure DB connected sebelum handle request
app.use(async (req, res, next) => {
    try {
        await ensureDBConnection();
        next();
    } catch (error) {
        res.status(500).json({ error: "Database connection failed" });
    }
});

// Inisialisasi Cloudinary
try {
    connectCloudinary();
} catch (error) {
    console.log("Cloudinary Setup Error:", error.message);
}

// Routes - Import langsung, bukan dynamic
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);

// Fallback route
app.get(['/', '/api'], (req, res) => {
    res.status(200).send("API ALBANI STORE WORKING");
});

// Export untuk Vercel
export default app;