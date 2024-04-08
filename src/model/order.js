import mongoose from "mongoose";
import attribute from "./attribute";

// Hàm để sinh orderNumber
const generateOrderNumber = () => {
  const timestamp = Date.now().toString();
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${timestamp}-${random}`;
};

// MODEL SCHEMA

const orderItemSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  name: {
    type: String,
    required: true,
  },
  // Phần getCart không có attribute và attributeValue nên phải comment 2 dòng này ()
  // attribute: {
  //   type: String,
  //   required: true,
  // },
  // attributeValue: {
  //   type: String,
  //   required: true,
  // },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  items: [orderItemSchema],
  orderNumber: {
    type: String,
    // required: true,
    unique: true,
  },
  customerInfo: {
    type: {
      name: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      payment: {
        type: String,
      },
      city: {
        type: String,
        required: true,
      },
    },
    required: true,
  },

  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// Tạo pre-save hook để sinh orderNumber trước khi lưu vào cơ sở dữ liệu
orderSchema.pre("save", function (next) {
  if (!this.orderNumber) {
    this.orderNumber = generateOrderNumber();
  }
  next();
});
export default mongoose.model("Order", orderSchema);
