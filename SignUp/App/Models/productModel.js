import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: null,
    },

    category: {
      type: String,
      enum: ["men", "women", "kids", "accessories"],
      required: true,
    },

    // STYLE TYPE FILTER (Eastern / Western)
    styleType: {
      type: String,
      enum: ["eastern", "western"],
      required: true,
      default: "eastern", // Purana data safe rakhne ke liye safe fallback
    },

    subcategory: {
      type: String,
      required: true,
    },

    productType: {
      type: String,
      enum: ["featured", "trending", "normal"],
      default: "normal",
    },

    status: {
      type: String,
      enum: ["new", "sale", "sold", "normal"],
      default: "new",
    },

    images: {
      type: [String],
      required: true,
    },

    sizes: [
      {
        size: {
          type: String,
          enum: ["XS", "S", "M", "L", "XL", "XXL"],
          required: true,
        },
        stock: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  { timestamps: true }
);

// ========================================================
// 🔥 SLUG AUTO GENERATE & UPDATE HOOK (FIXED)
// ========================================================
productSchema.pre("save", function (next) {
  // Agar product naya hai YA admin ne product ka Name change/modify kiya hai
  if (this.isModified("name") || !this.slug) {
    if (this.name) {
      this.slug = this.name
        .toLowerCase()
        .trim()
        .replace(/ /g, "-")          // Saare spaces ko dashboard dash (-) se replace karein
        .replace(/[^\w-]+/g, "");     // Special characters (@, #, $, %) saaf karein
    }
  }
  next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;