import mongoose from "mongoose";

const variationSchema = new mongoose.Schema({
  regularPrice: {
    type: Number,
    required: true,
  },
  salePrice: {
    type: Number,
    required: true,
  },
  productInStock: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  valueAttributeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ValueAttribute",
    required: true,
  },
});
export default mongoose.model("Variation", variationSchema);
