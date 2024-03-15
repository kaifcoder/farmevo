import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/category.controller.js";




const router = Router();

// create crud routes

router.route('/').get(verifyJWT, getAllCategories).post(verifyJWT, createCategory).put(verifyJWT, updateCategory).delete(verifyJWT, deleteCategory);




export default router;