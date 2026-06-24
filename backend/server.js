import express from "express";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

// Simple test route
app.get('/', (req, res) => {
    res.json({ status: "API is working!" });
});

app.get('/api/health', (req, res) => {
    res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Export untuk Vercel
export default app;