import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"
import { createProduct, deleteProduct, getAllProducts, getFarmerProducts, getProductById, updateProduct } from "../controllers/product.controller.js";


const router = Router();


// create crud routes
router.route('/').get(
    verifyJWT,
    getFarmerProducts
).post(
    verifyJWT,
    upload.single('thumbnail'),
    createProduct
);

router.route('/all').get(
    getAllProducts
);

router.route('/:id').get(
    verifyJWT,
    getProductById
).put(
    verifyJWT,
    upload.single('thumbnail'),
    updateProduct
).delete(
    verifyJWT,
    deleteProduct
);





export default router;