import express from "express";
import cors from 'cors';
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userroute.js";
import productRouter from "./routes/productroute.js";
import cartRoute from "./routes/cartRoute.js"; // Mengarah ke file cartRoute kamu yang sudah aman
import orderRouter from "./routes/orderroute.js";
import dotenv from "dotenv";
import dns from 'dns';

dns.setServers(['1.1.1.1', '8.8.8.8']);
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));

connectDB().catch(err => console.log(err));
try { connectCloudinary(); } catch (e) {}

// API Endpoints
app.use(['/user', '/api/user'], userRouter);
app.use(['/product', '/api/product'], productRouter);
app.use(['/cart', '/api/cart'], cartRoute);
app.use(['/order', '/api/order'], orderRouter);

app.get(['/', '/api'], (req, res) => res.status(200).send("API ALBANI STORE WORKING"));

export default app;