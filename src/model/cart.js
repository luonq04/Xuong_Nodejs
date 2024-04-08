import mongoose, { Schema } from "mongoose";
import attribute from "./attribute";

const cartSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        attribute: {
          type: Schema.Types.ObjectId,
          ref: "Attribute",
          // required: true,
        },
        attributeValue: {
          type: Schema.Types.ObjectId,
          ref: "ValueAttribute",
          // required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamp: true, versionKey: false }
);

export default mongoose.model("Cart", cartSchema);
