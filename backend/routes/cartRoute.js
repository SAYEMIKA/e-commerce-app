import express from 'express';

const cartRouter = express.Router();

// Fungsi pembantu untuk memuat Controller & Middleware secara aman (mengatasi masalah huruf besar/kecil di Vercel)
const initCartRoutes = async () => {
    let cartController;
    let authUser;

    // 1. Load Cart Controller (Coba folder controllers huruf kecil, jika gagal coba huruf kapital)
    try {
        cartController = await import('../controllers/cartController.js');
    } catch {
        cartController = await import('../Controllers/cartController.js');
    }

    // 2. Load Auth Middleware (Coba folder middleware huruf kecil, jika gagal coba huruf kapital)
    try {
        authUser = (await import('../middleware/auth.js')).default;
    } catch {
        try {
            authUser = (await import('../middleware/Auth.js')).default;
        } catch {
            authUser = (await import('../Middleware/auth.js')).default;
        }
    }

    // Destructure fungsi dari controller yang berhasil dimuat
    const { addToCart, getUserCart, updateCart } = cartController;

    // Pasang Router dengan Middleware dan Controller
    cartRouter.post('/get', authUser, getUserCart);
    cartRouter.post('/add', authUser, addToCart);
    cartRouter.post('/update', authUser, updateCart);
};

// Jalankan inisialisasi route
initCartRoutes().catch(err => console.log("Error initializing cart routes:", err.message));

export default cartRouter;