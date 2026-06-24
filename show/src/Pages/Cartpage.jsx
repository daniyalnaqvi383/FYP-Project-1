import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import { Minus, Plus, X } from "lucide-react";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#f8f8f8] px-6 md:px-16 py-12">
      {/* Heading */}
      <div className="text-center mb-14">
        <h1 className="text-4xl tracking-[6px] font-light text-black">
          CART
        </h1>

        <button  className="mt-3 text-sm border-b border-[#C19A6B] text-[#C19A6B] tracking-wide hover:opacity-70 transition">
          Continue shopping
        </button>
      </div>

      {cart.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          Your cart is empty
        </div>
      ) : (
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12">
          {/* Left Side */}
          <div className="space-y-10">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between border-b border-gray-300 pb-8"
              >
                {/* Product */}
                <div className="flex gap-5">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-28 h-36 object-cover"
                  />

                  <div className="space-y-2">
                    <h2 className="text-lg tracking-wide text-[#1d2b5c]">
                      {item.name}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Size: {item.size}
                    </p>

                    {/* Qty Box */}
                    <div className="flex items-center border w-fit mt-3">
                      <button className="px-3 py-2 hover:bg-gray-100">
                        <Minus size={16} />
                      </button>

                      <span className="px-4 text-sm">
                        {item.quantity}
                      </span>

                      <button className="px-3 py-2 hover:bg-gray-100">
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => dispatch(removeFromCart(index))}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 mt-3 transition"
                    >
                      <X size={14} />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Price */}
                <div className="mt-6 sm:mt-0 text-right">
                  <p className="text-lg tracking-wide text-[#1d2b5c]">
                    Rs.{item.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side Checkout */}
          <div className="bg-[#f3f3f3] p-8 h-fit">
            <div className="flex justify-between text-black mb-8">
              <span className="tracking-wide">Subtotal</span>

              <span className="font-medium">
                Rs.{total.toLocaleString()}
              </span>
            </div>

            <button className="w-full bg-black border-black text-white py-4 tracking-[4px] uppercase hover:bg-[#C19A6B] transition">
              Check Out
            </button>
          </div>
        </div>
      )}
      
    </div>



  );
}