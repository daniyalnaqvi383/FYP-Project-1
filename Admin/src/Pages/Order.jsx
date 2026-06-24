import React, { useEffect, useState } from "react";
import axios from "axios";
import { ShoppingBag, User, Phone, MapPin, Calendar, CreditCard, ShieldAlert } from "lucide-react";
import Navbar from "../Compontent/Navbar";
import Sidebar from "../Compontent/Sidebar";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8030/api/orders/admin/all");
      if (response.data.success) {
        setOrders(response.data.orders);
      }
    } catch (error) {
      console.error("Error fetching admin orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`http://localhost:8030/api/orders/admin/update/${orderId}`, {
        orderStatus: newStatus,
      });
      if (response.data.success) {
        alert("Order status updated successfully!");
        fetchOrders(); 
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update status.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500 font-medium bg-gray-50">
        <div className="animate-pulse text-sm tracking-widest text-[#1e2d4a] font-bold uppercase">
          Loading Placed Orders...
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full min-h-screen bg-gray-50">
      
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 min-h-screen">
        
        <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* 💡 SPACE REDUCED: Changed pt-32 to pt-24 to pull the master orders list up perfectly */}
        <div className="pt-18 p-6 md:pl-72 transition-all duration-300 font-sans antialiased text-gray-800">
          
          {/* PAGE HEADER */}
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-[#1e2d4a] p-2.5 rounded-lg text-white shadow-sm">
              <ShoppingBag size={22} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-tight">Master Orders Repository</h1>
              <p className="text-xs text-gray-500">Track user checkouts, different billing addresses, and payment logs</p>
            </div>
          </div>

          {/* MAIN ORDERS LIST CONTAINER */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-12 text-center text-gray-400 text-sm">
              No orders have been found inside database collection.
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order._id} 
                  className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-0 hover:border-gray-300 transition duration-200"
                >
                  
                  {/* 1. LEFT BLOCK: CUSTOMER & DELIVERY INFO */}
                  <div className="col-span-1 lg:col-span-4 p-5 bg-gray-50/40 lg:border-r border-gray-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] bg-gray-200 text-gray-700 px-2 py-0.5 rounded font-mono font-bold tracking-wider">
                        ORD-{order._id.slice(-6).toUpperCase()}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                        <Calendar size={12} />
                        {new Date(order.createdAt).toLocaleString("en-PK")}
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="space-y-2.5 text-xs text-gray-600">
                      <div className="flex items-start gap-2">
                        <User size={14} className="text-gray-400 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-gray-900">{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                          <p className="text-gray-400 text-[11px] font-mono">{order.customerInfo.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone size={14} className="text-gray-400 shrink-0" />
                        <span className="font-medium text-gray-800">{order.customerInfo.phone}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin size={14} className="text-gray-400 shrink-0 mt-0.5" />
                        <p className="leading-tight text-gray-700">
                          <span className="font-medium text-gray-400 block text-[10px] uppercase tracking-wide">Shipping Address</span>
                          {order.customerInfo.address}, {order.customerInfo.city} ({order.customerInfo.postalCode})
                        </p>
                      </div>
                    </div>

                    {/* Dynamic Billing Address Box Check */}
                    {order.billingAddress && (
                      <div className="pt-3 border-t border-gray-100 text-xs text-gray-600 space-y-1">
                        <span className="font-medium text-gray-400 block text-[10px] uppercase tracking-wide">Billing Address</span>
                        <p className="font-medium text-gray-800">
                          {order.billingAddress.firstName} {order.billingAddress.lastName}
                        </p>
                        <p className="leading-tight text-gray-700 text-[11px]">
                          {order.billingAddress.address}, {order.billingAddress.city} ({order.billingAddress.postalCode})
                        </p>
                      </div>
                    )}

                    {/* Payment Gateway Type Name */}
                    <div className="pt-3 border-t border-gray-200/60 flex items-center justify-between text-xs font-medium">
                      <span className="text-gray-400 flex items-center gap-1"><CreditCard size={12}/> Gateway:</span>
                      <span className="text-[#1e2d4a] font-semibold tracking-wide text-[10px] bg-white border px-2 py-0.5 rounded shadow-sm">
                        {order.paymentMethod}
                      </span>
                    </div>
                  </div>

                  {/* 2. CENTER BLOCK: LISTING OF PRODUCTS */}
                  <div className="col-span-1 lg:col-span-5 p-5 space-y-3 max-h-[250px] overflow-y-auto custom-scrollbar">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Purchased Products</p>
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 text-xs border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <img 
                          src={item.image} 
                          className="w-12 h-14 object-cover rounded bg-gray-50 border border-gray-200 shadow-sm" 
                          alt="" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-800 tracking-tight leading-tight truncate">{item.name}</h4>
                          <p className="text-[11px] text-gray-400 mt-1">
                            Size: <span className="font-bold text-gray-700 bg-gray-100 px-1 py-0.5 rounded text-[10px]">{item.size}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            Qty: <span className="font-bold text-gray-700">{item.quantity}</span>
                          </p>
                        </div>
                        <span className="font-semibold text-gray-800 text-right shrink-0">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* 3. RIGHT BLOCK: PRICE BREAKDOWN & STATUS CONTROLS */}
                  <div className="col-span-1 lg:col-span-3 p-5 flex flex-col justify-between items-stretch bg-gray-50/20 lg:border-l border-gray-200 space-y-4 lg:space-y-0">
                    
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Gross Invoice Bill</p>
                      <p className="text-xl font-black text-[#1e2d4a] tracking-tight mt-1 flex items-baseline">
                        <span className="text-xs font-normal text-gray-400 mr-1 font-mono">PKR</span>
                        Rs. {order.totalAmount.toLocaleString()}
                      </p>
                      
                      <div className="mt-3 flex items-center justify-between text-xs border-b border-gray-100 pb-2">
                        <span className="text-gray-400">Payment:</span>
                        <span className={`font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded ${
                          order.paymentStatus === "Paid" 
                            ? "text-emerald-700 bg-emerald-50 border border-emerald-200" 
                            : "text-amber-700 bg-amber-50 border border-amber-200"
                        }`}>
                          {order.paymentStatus}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block">
                        Order Logistics Status
                      </label>
                      <select
                        value={order.orderStatus}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className={`w-full px-2.5 py-2 rounded text-xs font-semibold border bg-white focus:outline-none cursor-pointer transition shadow-sm ${
                          order.orderStatus === "Delivered" 
                            ? "text-emerald-700 border-emerald-200 bg-emerald-50/40" 
                            : order.orderStatus === "Shipped"
                            ? "text-blue-700 border-blue-200 bg-blue-50/40"
                            : order.orderStatus === "Cancelled"
                            ? "text-red-700 border-red-200 bg-red-50/40"
                            : "text-amber-700 border-amber-200 bg-amber-50/40"
                        }`}
                      >
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>

                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrders;