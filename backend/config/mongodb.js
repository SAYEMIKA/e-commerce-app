import mongoose from "mongoose";

const connectDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log("DB Connected")
    })

    mongoose.connection.on('error', (error) => {
        console.log('MongoDB connection error:', error)
    })

    mongoose.connection.on('disconnected', () => {
        console.log("DB Disconnected")
    })

    try {
        console.log('Connecting to MongoDB...')
        await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce?retryWrites=true&w=majority`, {
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        })
    } catch (error) {
        console.log('MongoDB connection failed:', error.message)
        throw error
    }
}

export default connectDB;