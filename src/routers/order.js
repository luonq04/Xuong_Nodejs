import express from "express";
import { createOrder, getAllOrder, getOrderById } from "../controllers/order";

const router = express.Router();

router.post("/order", createOrder).get("/order", getAllOrder);
router.get("/order/:id", getOrderById);

export default router;
