import Order from "../model/order";
import { StatusCodes } from "http-status-codes";

export const createOrder = async (req, res) => {
  try {
    const { userId, items, customerInfo, totalPrice } = req.body;
    const order = await Order.create({
      userId,
      items,
      totalPrice,
      customerInfo,
    });
    res.status(StatusCodes.CREATED).json(order);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const orders = await Order.findOne({ _id: req.params.id });
    res.status(StatusCodes.OK).json(orders);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
