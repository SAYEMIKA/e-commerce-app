import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from "dotenv";
import dns from 'dns';

// Change dns
dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();

// App config
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*", // Mengizinkan semua origin di Vercel agar tidak terkena CORS
    credentials: true
}));

// Koneksi Database & Cloudinary (Dijalankan langsung sekali di tingkat root serverless)
try {
    await connectDB();
    connectCloudinary();
} catch (error) {
    console.log('Database/Cloudinary connection error:', error.message);
}

// API Endpoints (Dibuat fleksibel tanpa /api tambahan karena sudah di-handle vercel.json)
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/cart', cartRoute);
app.use('/order', orderRouter);

// Fallback rute jika menembak /api langsung
app.get('/', (req, res) => {
    res.send("API ALBANI STORE WORKING");
});

// WAJIB: Export app untuk serverless Vercel (Hapus app.listen)
export default app;