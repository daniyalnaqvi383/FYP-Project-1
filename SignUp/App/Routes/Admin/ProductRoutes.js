import express from "express";
import upload from "../../Middlewre/multer.js"; // 👈 Aapka original path bilkul same rakha hai

import {
  addProduct,
  listProduct,
  singleProduct,
  updateProduct,
  removeProduct,
} from "../../Controller/Web/ProductController.js";

const productRoutes = express.Router();

// ============================================
// 1. CREATE PRODUCT (POST)
// ============================================
// Endpoint: POST http://localhost:8030/api/products/
productRoutes.post(
  "/",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
  ]),
  addProduct
);

// ============================================
// 2. UNIVERSAL GET & FILTER PRODUCTS (GET)
// ============================================
// MASTER ENDPOINT: Yahi aik route ab niche waale saare patterns ko handle karega!
// - Saare products ke liye: /api/products/
// - Featured ke liye:     /api/products/?productType=featured
// - Trending ke liye:     /api/products/?productType=trending
// - Category ke liye:     /api/products/?category=men
// - Style filter ke liye:  /api/products/?category=women&styleType=western
productRoutes.get("/", listProduct);

// ============================================
// 3. SINGLE PRODUCT DETAILS (GET)
// ============================================
// Endpoint: GET http://localhost:8030/api/products/:id
productRoutes.get("/:id", singleProduct);

// ============================================
// 4. UPDATE PRODUCT (PUT)
// ============================================
// Endpoint: PUT http://localhost:8030/api/products/:id
productRoutes.put(
  "/:id",
  upload.none(), // ✅ Safe for form-data update
  updateProduct
);

// ============================================
// 5. DELETE PRODUCT (DELETE)
// ============================================
// Endpoint: DELETE http://localhost:8030/api/products/:id
productRoutes.delete("/:id", removeProduct);

export default productRoutes;