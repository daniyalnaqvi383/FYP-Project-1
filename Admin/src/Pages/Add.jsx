import React, { useState, useEffect } from "react";
import Navbar from "../Compontent/Navbar";
import Sidebar from "../Compontent/Sidebar";
import uploadIcon from "../assets/upload.avif";

export default function AddProduct() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ============================================
  // IMAGES
  // ============================================
  const [previews, setPreviews] = useState([null, null, null]);
  const [files, setFiles] = useState([null, null, null]);

  // ============================================
  // PRODUCT STATE (UPDATED WITH STYLETYPE)
  // ============================================
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    subcategory: "",
    styleType: "eastern", 
    productType: "normal",
    status: "normal",
    sizes: [{ size: "", stock: "" }],
  });

  // ============================================
  // CLEANUP
  // ============================================
  useEffect(() => {
    return () =>
      previews.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
  }, [previews]);

  // ============================================
  // IMAGE CHANGE
  // ============================================
  const handleFileChange = (i, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFiles((prev) => {
      const copy = [...prev];
      copy[i] = file;
      return copy;
    });

    setPreviews((prev) => {
      const copy = [...prev];
      if (copy[i]) URL.revokeObjectURL(copy[i]);
      copy[i] = URL.createObjectURL(file);
      return copy;
    });
  };

  // ============================================
  // INPUT CHANGE
  // ============================================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================
  // SIZE SYSTEM
  // ============================================
  const handleSizeChange = (index, field, value) => {
    const updated = [...product.sizes];
    updated[index][field] = value;

    setProduct((prev) => ({
      ...prev,
      sizes: updated,
    }));
  };

  const addSize = () => {
    setProduct((prev) => ({
      ...prev,
      sizes: [...prev.sizes, { size: "", stock: "" }],
    }));
  };

  const removeSize = (index) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index),
    }));
  };

  // ============================================
  // SUBMIT (UPDATED PAYLOAD BINDING)
  // ============================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!files[0] && !files[1] && !files[2]) {
      alert("Please upload at least 1 image");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("oldPrice", product.oldPrice);
      formData.append("category", product.category);
      formData.append("subcategory", product.subcategory);
      formData.append("styleType", product.styleType); 
      formData.append("productType", product.productType);
      formData.append("status", product.status);

      formData.append("size", JSON.stringify(product.sizes));

      if (files[0]) formData.append("image1", files[0]);
      if (files[1]) formData.append("image2", files[1]);
      if (files[2]) formData.append("image3", files[2]);

      const res = await fetch("http://localhost:8030/api/product/", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        alert("Product Added Successfully!");

        setProduct({
          name: "",
          description: "",
          price: "",
          oldPrice: "",
          category: "",
          subcategory: "",
          styleType: "eastern", 
          productType: "normal",
          status: "normal",
          sizes: [{ size: "", stock: "" }],
        });

        setFiles([null, null, null]);
        setPreviews([null, null, null]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen w-full overflow-x-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 min-h-screen w-full">
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* 💡 RESPONSIVE CONTENT CONTAINER: Adjusts padding and layout width flawlessly across phone and desktop screens */}
        <div className="pt-24 p-4 sm:p-6 md:pl-72 transition-all duration-300 w-full max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-6 text-center md:text-left">
            Add New Product
          </h2>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg w-full">

            {/* IMAGES */}
            <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-700">
              Upload Images
            </h3>

            {/* Responsive grid for image slots */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[0, 1, 2].map((i) => (
                <label
                  key={i}
                  className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-blue-500 transition rounded-xl w-full h-32 flex flex-col items-center justify-center bg-gray-50 p-2"
                >
                  {previews[i] ? (
                    <img
                      src={previews[i]}
                      className="w-full h-full object-contain rounded shadow"
                      alt=""
                    />
                  ) : (
                    <div className="flex flex-col items-center text-gray-500">
                      <img src={uploadIcon} className="w-8 h-8 opacity-70" alt="" />
                      <span className="text-xs mt-1">Upload Slot {i + 1}</span>
                    </div>
                  )}

                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(i, e)}
                  />
                </label>
              ))}
            </div>

            {/* RESPONSIVE FORM GRID ARCHITECTURE */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">

              {/* Row 1: Name and Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 px-1">Product Name</label>
                  <input
                    className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    name="name"
                    placeholder="e.g., Slim-Fit Premium Polo"
                    value={product.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 px-1">Retail Price (PKR)</label>
                  <input
                    className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    name="price"
                    placeholder="e.g., 2490"
                    value={product.price}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 2: Old Price */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Old Price / Compare at Price (Optional)</label>
                <input
                  className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  name="oldPrice"
                  placeholder="e.g., 3490"
                  value={product.oldPrice}
                  onChange={handleChange}
                />
              </div>

              {/* Row 3: Description */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Product Specifications & Description</label>
                <textarea
                  className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                  rows={4}
                  name="description"
                  placeholder="Describe material, fit types, and care info..."
                  value={product.description}
                  onChange={handleChange}
                />
              </div>

              {/* Row 4: Category and Subcategory */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 px-1">Primary Category</label>
                  <select
                    className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 px-1">Subcategory Type</label>
                  <input
                    className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    name="subcategory"
                    placeholder="e.g., kurta, polo, jeans"
                    value={product.subcategory}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Row 5: Product Type and Style Type */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 px-1">Catalog Tag Placement</label>
                  <select
                    className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    name="productType"
                    value={product.productType}
                    onChange={handleChange}
                  >
                    <option value="normal">Normal Product</option>
                    <option value="featured">Featured Product</option>
                    <option value="trending">Trending Collection</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-semibold text-gray-500 px-1">Brand Style Classification</label>
                  <select
                    className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                    name="styleType"
                    value={product.styleType}
                    onChange={handleChange}
                  >
                    <option value="eastern">Eastern Wear</option>
                    <option value="western">Western Wear</option>
                  </select>
                </div>
              </div>

              {/* Row 6: Badge Status */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-500 px-1">Inventory Banner Status</label>
                <select
                  className="border rounded-lg px-4 py-2.5 w-full bg-gray-50/50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer"
                  name="status"
                  value={product.status}
                  onChange={handleChange}
                >
                  <option value="normal">Standard Display</option>
                  <option value="new">New Arrival</option>
                  <option value="sale">On Sale</option>
                  <option value="sold">Out of Stock</option>
                </select>
              </div>

              {/* SIZES ARCHITECTURE */}
              <div className="border p-4 rounded-xl bg-gray-50/30">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Inventory Size Variants</h3>
                  <button 
                    type="button" 
                    onClick={addSize} 
                    className="text-sm font-bold bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition"
                  >
                    + Add Variant
                  </button>
                </div>

                <div className="space-y-3">
                  {product.sizes.map((s, i) => (
                    <div key={i} className="flex flex-row gap-2 items-center bg-white p-2 rounded-lg shadow-sm border border-gray-100">
                      <select
                        className="border rounded px-2 py-1.5 flex-1 bg-white focus:outline-none text-xs sm:text-sm"
                        value={s.size}
                        onChange={(e) =>
                          handleSizeChange(i, "size", e.target.value)
                        }
                      >
                        <option value="">Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                      </select>

                      <input
                        className="border rounded px-2 py-1.5 flex-1 bg-white focus:outline-none text-xs sm:text-sm"
                        placeholder="Stock Count"
                        type="number"
                        value={s.stock}
                        onChange={(e) =>
                          handleSizeChange(i, "stock", e.target.value)
                        }
                      />

                      <button
                        type="button"
                        onClick={() => removeSize(i)}
                        className="text-red-500 font-bold hover:bg-red-50 p-1.5 rounded transition shrink-0"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-xl mt-4 transition shadow-md w-full sm:w-auto sm:self-end">
                Save & Post Product
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}