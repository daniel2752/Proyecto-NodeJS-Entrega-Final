import { Router } from "express";
import {
  createProduct,
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
} from "../controllers/products.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", authenticate, createProduct);

router.delete("/:id", authenticate, deleteProduct);

router.put("/:id", authenticate, updateProduct);

export default router;
