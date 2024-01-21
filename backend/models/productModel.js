import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
   
    brand: { type: String, required: false },
    quantity: { type: Number, required: false },
    category: { type: ObjectId, ref: "Category", required: false },
    description: { type: String, required: false },
    // reviews:{ [reviewSchema], required:fale},
    rating: { type: Number, required: false, default: 0 },
    numReviews: { type: Number, required: false, default: 0 },
    price: { type: Number, required: false, default: 0 },
    countInStock: { type: Number, required: false, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);
export default Product;
