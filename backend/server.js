import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import dotenv from "dotenv";
import dns from 'dns';

// Set DNS Servers untuk mencegah timeout koneksi di Vercel
dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
    origin: "*", 
    credentials: true
}));

// Inisialisasi koneksi Database & Cloudinary
connectDB()
    .then(() => console.log("Database Connected Successfully"))
    .catch((err) => console.log("Database Connection Failed:", err.message));

try {
    connectCloudinary();
} catch (error) {
    console.log("Cloudinary Setup Error:", error.message);
}

// FUNGSI AMAN: Memuat semua rute dengan mencoba versi huruf kecil & huruf kapital
const bootstrapRoutes = async () => {
    // 1. User Route
    try { app.use(['/user', '/api/user'], (await import("./routes/userroute.js")).default); } 
    catch { app.use(['/user', '/api/user'], (await import("./routes/userRoute.js")).default); }

    // 2. Product Route
    try { app.use(['/product', '/api/product'], (await import("./routes/productroute.js")).default); } 
    catch { app.use(['/product', '/api/product'], (await import("./routes/productRoute.js")).default); }

    // 3. Cart Route
    try { app.use(['/cart', '/api/cart'], (await import("./routes/cartRoute.js")).default); } 
    catch { app.use(['/cart', '/api/cart'], (await import("./routes/cartroute.js")).default); }

    // 4. Order Route
    try { app.use(['/order', '/api/order'], (await import("./routes/orderroute.js")).default); } 
    catch { app.use(['/order', '/api/order'], (await import("./routes/orderRoute.js")).default); }
};

// Jalankan pemuatan rute secara asinkronus
bootstrapRoutes().catch(err => console.log("Error bootstrapping routes:", err.message));

// Fallback rute untuk verifikasi status API
app.get(['/', '/api'], (req, res) => {
    res.status(200).send("API ALBANI STORE WORKING");
});

// WAJIB UNTUK VERCEL
export default app;