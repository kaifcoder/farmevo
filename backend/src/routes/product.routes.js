import { Router } from "express";

import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";


const router = Router();


// create crud routes
router.route('/').get(
    verifyJWT,
    getAllProducts
).post(
    verifyJWT,
    upload.single('thumbnail'),
    createProduct
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