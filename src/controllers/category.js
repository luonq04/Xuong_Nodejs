import { StatusCodes } from "http-status-codes";

import { categorySchema } from "../schemas/category";
import Category from "../model/category";
import Product from "../model/product";

export const addCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body, { abortEarly: false });

    console.log(error);

    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: errors,
      });
    }

    const existType = await Category.findOne({ name: req.body.name });

    if (existType)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Đã có tên loại sản phẩm này rồi",
      });

    const data = await Category(req.body).save();
    res.status(201).json(data);
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const data = await Category.find();

    if (data.length < 0)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Không tìm thấy loại của sản phẩm",
      });

    return res.status(StatusCodes.OK).json({
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.id });
    const category = await Category.findOne({ _id: req.params.id });

    if (category.length < 0)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Không tìm thấy loại của danh mục",
      });

    return res.status(StatusCodes.OK).json({
      category,
      products,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);

      return res.status(StatusCodes.BAD_REQUEST).json({
        message: errors,
      });
    }

    const data = await Category.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!data)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Không tìm thấy loại sản phẩm",
      });

    return res.status(StatusCodes.OK).json({
      data,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const data = await Category.findOneAndDelete({ _id: req.params.id });
    console.log("delete category");

    if (!data)
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Không tìm thấy danh mục",
      });

    return res.status(StatusCodes.OK).json({ data });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message,
    });
  }
};
