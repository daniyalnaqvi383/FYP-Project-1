import React, { useEffect, useState } from "react";
import Navbar from "../Compontent/Navbar";
import Sidebar from "../Compontent/Sidebar";
import { MdDelete, MdEdit } from "react-icons/md";

export default function Lists() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // =========================
  // FETCH PRODUCTS
  // =========================
  const fetchProducts = async () => {
    try {
      const res = await fetch("http://localhost:8030/api/product");
      const data = await res.json();

      if (data.products) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // DELETE
  // =========================
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`http://localhost:8030/api/product/${id}`, {
        method: "DELETE",
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // OPEN EDIT MODAL
  // =========================
  const openUpdateModal = (item) => {
    setEditProduct({
      _id: item._id,
      name: item.name,
      description: item.description,
      price: item.price,
      oldPrice: item.oldPrice || "",
      category: item.category,
      subcategory: item.subcategory,
      styleType: item.styleType || "eastern", // 👈 Controls tracking current style input defaults
      productType: item.productType,
      status: item.status,

      stock:
        item.sizes?.reduce((acc, s) => acc + (s.stock || 0), 0) || 0,

      size: item.sizes?.map((s) => s.size).join(", ") || "",
    });

    setModalOpen(true);
  };

  // =========================
  // CHANGE HANDLER
  // =========================
  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // UPDATE PRODUCT
  // =========================
  const handleUpdate = async () => {
    try {
      const payload = {
        ...editProduct,
        price: Number(editProduct.price),
        oldPrice: editProduct.oldPrice
          ? Number(editProduct.oldPrice)
          : null,
        styleType: editProduct.styleType, // 👈 Strict sync update payload field mapping

        sizes: editProduct.size.split(",").map((s) => ({
          size: s.trim(),
          stock: Number(editProduct.stock || 0),
        })),
      };

      const res = await fetch(
        `http://localhost:8030/api/product/${editProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Updated Successfully");
        setModalOpen(false);
        fetchProducts();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 md:ml-[260px] ml-0">

        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="pt-[70px] px-3 sm:px-4 md:px-6 lg:px-8">

          <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
            Product List
          </h2>

          <div className="bg-white p-3 sm:p-4 md:p-6 rounded-2xl shadow-lg overflow-x-auto">

            {/* HEADER */}
            <div className="hidden lg:grid lg:grid-cols-11 font-semibold border-b pb-2 mb-3 text-sm min-w-[900px]">
              <span>#</span>
              <span>Images</span>
              <span>Name</span>
              <span>Category</span>
              <span>Type</span>
              <span>Price</span>
              <span>Old Price</span>
              <span>Status</span>
              <span>Stock</span>
              <span>Size</span>
              <span>Action</span>
            </div>

            {/* PRODUCTS */}
            {products.length > 0 ? (
              products.map((item, index) => (
                <div
                  key={item._id}
                  className="border-b py-4 text-sm flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between lg:grid lg:grid-cols-11 lg:gap-0 lg:items-center min-w-0"
                >
                  {/* INDEX */}
                  <div className="font-bold lg:font-normal">
                    #{index + 1}
                  </div>

                  {/* IMAGE */}
                  <div className="flex gap-1">
                    <img
                      src={item.images?.[0]}
                      className="w-8 h-8 lg:w-10 lg:h-10 object-cover rounded"
                    />
                  </div>

                  {/* NAME */}
                  <div className="font-medium truncate max-w-[100px]">
                    {item.name}
                  </div>

                  {/* CATEGORY */}
                  <div className="capitalize">{item.category}</div>

                  {/* TYPE */}
                  <div className="capitalize">{item.productType}</div>

                  {/* PRICE */}
                  <div className="text-green-600 font-semibold">
                    Rs {item.price}
                  </div>

                  {/* OLD PRICE */}
                  <div className="text-gray-400 line-through">
                    {item.oldPrice ? `Rs ${item.oldPrice}` : "-"}
                  </div>

                  {/* STATUS */}
                  <div className="capitalize">{item.status}</div>

                  {/* STOCK */}
                  <div>
                    {item.sizes?.reduce(
                      (acc, s) => acc + (s.stock || 0),
                      0
                    )}
                  </div>

                  {/* SIZE */}
                  <div>
                    {item.sizes?.map((s) => s.size).join(", ")}
                  </div>

                  {/* ACTION */}
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => openUpdateModal(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <MdEdit className="text-xl" />
                    </button>

                    <button
                      onClick={() => deleteProduct(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-10 text-gray-500">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =========================
          MODAL TEMPLATE LAYER
      ========================= */}
      {modalOpen && editProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">

          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">

            <h3 className="text-xl font-semibold mb-5 text-gray-800">
              Update Product
            </h3>

            <div className="flex flex-col gap-3">

              <input
                className="border rounded-lg w-full p-2"
                name="name"
                value={editProduct.name}
                onChange={handleEditChange}
                placeholder="Name"
              />

              <div className="flex gap-2">
                <input
                  className="border rounded-lg w-1/2 p-2"
                  name="price"
                  value={editProduct.price}
                  onChange={handleEditChange}
                  placeholder="Price"
                />

                <input
                  className="border rounded-lg w-1/2 p-2"
                  name="oldPrice"
                  value={editProduct.oldPrice}
                  onChange={handleEditChange}
                  placeholder="Old Price"
                />
              </div>

              <div className="flex gap-2">

                <select
                  className="border rounded-lg w-1/2 p-2"
                  name="category"
                  value={editProduct.category}
                  onChange={handleEditChange}
                >
                  <option value="">Category</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="accessories">Accessories</option>
                </select>

                <input
                  className="border rounded-lg w-1/2 p-2"
                  name="subcategory"
                  value={editProduct.subcategory}
                  onChange={handleEditChange}
                  placeholder="Subcategory"
                />

              </div>

              <div className="flex gap-2">

                <select
                  className="border rounded-lg w-1/2 p-2"
                  name="productType"
                  value={editProduct.productType}
                  onChange={handleEditChange}
                >
                  <option value="normal">Normal</option>
                  <option value="featured">Featured</option>
                  <option value="trending">Trending</option>
                </select>

                <select
                  className="border rounded-lg w-1/2 p-2"
                  name="status"
                  value={editProduct.status}
                  onChange={handleEditChange}
                >
                  <option value="normal">Normal</option>
                  <option value="new">New</option>
                  <option value="sale">Sale</option>
                  <option value="sold">Sold</option>
                </select>

              </div>

              {/* STYLE TYPE DROPDOWN COMPONENT */}
              <div className="flex gap-2">
                <select
                  className="border rounded-lg w-full p-2"
                  name="styleType"
                  value={editProduct.styleType}
                  onChange={handleEditChange}
                >
                  <option value="eastern">Eastern Style</option>
                  <option value="western">Western Style</option>
                </select>
              </div>

              <div className="flex gap-2">

                <input
                  className="border rounded-lg w-1/2 p-2"
                  name="stock"
                  value={editProduct.stock}
                  onChange={handleEditChange}
                  placeholder="Stock"
                />

                <input
                  className="border rounded-lg w-1/2 p-2"
                  name="size"
                  value={editProduct.size}
                  onChange={handleEditChange}
                  placeholder="S,M,L"
                />

              </div>

            </div>

            {/* BUTTONS */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={handleUpdate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex-1"
              >
                Save Changes
              </button>

              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex-1"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}