import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/products";
import { checkAuth } from "../middlewares/checkAuth";

const router = express.Router();

router.get("/products", getAllProducts);

router.get("/products/:id", getProductById);

router.post("/products", addProduct);
// router.post("/products", checkAuth, addProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
