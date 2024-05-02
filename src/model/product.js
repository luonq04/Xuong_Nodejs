import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    // price: {
    //   type: Number,
    //   required: true,
    // },

    // sale: {
    //   type: Number,
    //   default: 0,
    // },

    description: {
      type: String,
    },

    image: {
      type: String,
      required: true,
    },

    gallery: [String],

    createAt: {
      type: Date,
      default: Date.now(),
      // Ta có thể bỏ qua field khỏi schema khi được select (Trong trg hợp data nhạy cảm,...)
      select: false,
    },

    customerReview: [Object],
    tags: [String],
    attributes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attribute",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

productSchema.plugin(paginate);

export default mongoose.model("Product", productSchema);
