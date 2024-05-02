import { StatusCodes } from "http-status-codes";
import Cart from "../model/cart";
import attribute from "../model/attribute";

export const addItemToCart = async (req, res) => {
  const { userId, product, quantity, attribute, attributeValue } = req.body;

  console.log(req.body);

  try {
    // Kiểm tra giỏ hàng có tồn tại chưa? dựa trên userId

    // lưu giỏ hàng
    let cart = await Cart.findOne({ userId });
    console.log(cart);

    // nếu giỏ hàng không tồn tại thì tạo mới
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    const existProductIndex = cart.products.findIndex(
      (item) =>
        item.product.toString() == product &&
        item.attribute.toString() == attribute &&
        item.attributeValue.toString() == attributeValue
    );

    console.log(existProductIndex);

    if (existProductIndex !== -1) {
      // nếu mà sản phẩm tồn tại thì update số lượng
      cart.products[existProductIndex].quantity += quantity;
    } else {
      // nếu sản phẩm chưa có trong giỏ hàng thì thêm mới

      cart.products.push({ product, quantity, attribute, attributeValue });
    }

    await cart.save();

    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    // trả về client lỗi
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};

export const getCartByUserId = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ userId })
      .populate("products.product")
      .populate("products.attribute")
      .populate("products.attributeValue");

    // console.log("CArt", cart.products);

    // console.log(cart);

    const cartData = cart.products.map((item) => ({
      productId: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      image: item.product.image,
      // price: item.attributeValue.price,
      color: item.attributeValue.color,
      size: item.attributeValue.name,
      attribute: item.attribute._id,
      attributeValue: item.attributeValue._id,
      _id: item._id,
    }));

    console.log("Cart Data", cartData);

    return res.status(StatusCodes.OK).json(cartData);
  } catch (error) {
    // trả về client lỗi
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  const { userId, productDel, attribute, attributeValue } = req.body;

  console.log("BODY", req.body);
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `Cart not found ${userId}` });
    }

    console.log("CART PRODUCT BEFORE:", cart.products);

    cart.products = cart.products.filter((pro) => {
      return (
        pro.product.toString() !== productDel ||
        pro.attribute.toString() !== attribute ||
        pro.attributeValue.toString() !== attributeValue
      );
    });

    console.log("CART PRODUCT AFTER:", cart.products);

    await cart.save();
    return res.status(StatusCodes.OK).json(cart);
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};

export const updateProductQuantity = async (req, res) => {
  const { userId, product, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }

    const productUpdate = cart.products.find(
      (item) => item.product.toString() === product
    );
    if (!productUpdate) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }
    productUpdate.quantity = quantity;
    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};

export const increaseProductQuantity = async (req, res) => {
  const { userId, product } = req.body;

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }

    const productIncrese = cart.products.find(
      (item) => item._id.toString() === product
    );
    if (!productIncrese) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    console.log(productIncrese);

    productIncrese.quantity++;

    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};

export const decreaseProductQuantity = async (req, res) => {
  const { userId, product } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Cart not found" });
    }

    const productIncrese = cart.products.find(
      (item) => item._id.toString() === product
    );
    if (!productIncrese) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Product not found" });
    }

    if (productIncrese.quantity > 1) {
      productIncrese.quantity--;
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Khong the giam them" });
    }

    await cart.save();
    return res.status(StatusCodes.OK).json({ cart });
  } catch (error) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Internal Server Error" });
  }
};
