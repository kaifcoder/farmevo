import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { allCat, createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/category.controller.js";




const router = Router();

// create crud routes

router.route('/').get(verifyJWT, getAllCategories).post(verifyJWT, createCategory).put(verifyJWT, updateCategory).delete(verifyJWT, deleteCategory);

router.route('/all').get(allCat);




export default router;