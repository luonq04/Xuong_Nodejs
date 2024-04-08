import express from "express";
import {
  createOrder,
  getAllOrder,
  getOrderById,
  updateStatusOrder,
} from "../controllers/order";

const router = express.Router();

router.route("/order").post(createOrder).get(getAllOrder);
router.route("/order/:id").get(getOrderById).put(updateStatusOrder);

export default router;
