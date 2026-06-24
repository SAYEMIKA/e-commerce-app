import express from 'express';

const productRouter = express.Router();

const initProductRoutes = async () => {
    let productController;
    let upload;
    let adminAuth;

    // 1. Load Product Controller (Mendukung controllers huruf kecil / huruf besar)
    try {
        productController = await import('../controllers/productController.js');
    } catch {
        productController = await import('../Controllers/productController.js');
    }

    // 2. Load Multer Middleware
    try {
        upload = (await import('../middleware/multer.js')).default;
    } catch {
        upload = (await import('../Middleware/multer.js')).default;
    }

    // 3. Load Admin Auth Middleware
    try {
        adminAuth = (await import('../middleware/adminAuth.js')).default;
    } catch {
        try {
            adminAuth = (await import('../middleware/AdminAuth.js')).default;
        } catch {
            try {
                adminAuth = (await import('../Middleware/adminAuth.js')).default;
            } catch {
                adminAuth = (await import('../Middleware/AdminAuth.js')).default;
            }
        }
    }

    // Ambil fungsi asli dari controller kamu (listProduct tanpa 's')
    const { listProduct, addProduct, removeProduct, singleProduct } = productController;

    // Pasang rute sesuai struktur asli kamu
    productRouter.post(
        '/add',
        adminAuth,
        upload.fields([
            { name: 'image1', maxCount: 1 },
            { name: 'image2', maxCount: 1 },
            { name: 'image3', maxCount: 1 },
            { name: 'image4', maxCount: 1 }
        ]),
        addProduct
    );
    productRouter.post('/remove', adminAuth, removeProduct);
    productRouter.post('/single', singleProduct);
    productRouter.get('/list', listProduct);
};

// Jalankan inisialisasi rute produk
initProductRoutes().catch(err => console.log("Error initializing product routes:", err.message));

export default productRouter;