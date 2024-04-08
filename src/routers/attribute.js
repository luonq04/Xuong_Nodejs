import { Router } from "express";
import {
  createAttribute,
  createAttributeForProduct,
  createValueAttribute,
  deleteAttribute,
  deleteValueAttribute,
  getAllAttributes,
  getAttributeById,
  updateAttribute,
  getValueAttributeById,
  updateValueAttribute,
} from "../controllers/attribute";

const router = Router();
// Route để tạo mới một thuộc tính
router.post("/attributes", createAttribute);

// Route để tạo mới một thuộc tính cho product đã tồn tại (qua ID của product)
router.post("/attributes/:id/product", createAttributeForProduct);

// Route để thêm giá trị cho thuộc tính đã tồn tại
router.post("/attributes/:id/values", createValueAttribute);

// Route để lấy tất cả các thuộc tính
router.get("/attributes", getAllAttributes);

// Route để lấy một thuộc tính theo ID
router.get("/attributes/:id", getAttributeById);

// Route để cập nhật một thuộc tính theo ID
router.put("/attributes/:id", updateAttribute);

// Route để xóa một thuộc tính theo ID (attribute)
router.delete("/attributes/:id", deleteAttribute);

// Route để xóa một giá trị theo ID (value)
router.delete("/attributes/:id/values", deleteValueAttribute);

// values attribute
router.get("/attributeValues/:id", getValueAttributeById);
router.put("/attributeValues/:id", updateValueAttribute);

export default router;
