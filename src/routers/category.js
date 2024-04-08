import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  updateCategory,
} from "../controllers/category";

const router = express.Router();

router.route("/category").post(addCategory).get(getAllCategory);
router
  .route("/category/:id")
  .put(updateCategory)
  .get(getCategoryById)
  .delete(deleteCategory);

export default router;
