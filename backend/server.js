import express from "express";
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import dotenv from "dotenv";
import dns from 'dns';

//Change dns
dns.setServers(['1.1.1.1', '8.8.8.8']);

dotenv.config();

//App config
const app = express()
const port = process.env.PORT || 4000

//middlewares
app.use(express.json())
app.use(cors({}))

//api endpoint
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRoute)
app.use('/api/order',orderRouter)

app.get('/',(req,res)=>{
    res.send("API WORKING")
})

const startServer = async () => {
    try {
        console.log('Starting server...')
        console.log('Connecting to database...')
        await connectDB()
        console.log('Cloudinary setup...')
        connectCloudinary()
        app.listen(port, () => console.log('Server started on PORT: ' + port))
    } catch (error) {
        console.log('Failed to start server:', error.message)
        process.exit(1)
    }
}

startServer()