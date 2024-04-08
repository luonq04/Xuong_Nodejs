import { Router } from "express";
import {
  addItemToCart,
  decreaseProductQuantity,
  getCartByUserId,
  increaseProductQuantity,
  removeFromCart,
  updateProductQuantity,
} from "../controllers/cart";

const router = Router();

router.post("/cart/add-to-cart", addItemToCart);
router.get("/cart/:userId", getCartByUserId);
router.put("/cart/update-product-quantity", updateProductQuantity);
router.post("/cart/remove-from-cart", removeFromCart);
router.post("/cart/increseQuantity", increaseProductQuantity);
router.post("/cart/decreseQuantity", decreaseProductQuantity);

export default router;
