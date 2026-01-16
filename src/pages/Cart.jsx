import React from 'react'
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, increment, decrement } = useCart();

  const totalProducts = cart.length;

  const totalQuantity = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen gap-6 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] flex justify-center px-4 py-10">

      {/* LEFT CART ITEMS */}
      <div className='min-h-[200px] h-auto w-140 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-3xl p-10 text-white' >

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div
              key={item.id}
              className="flex justify-between items-center mb-6 border-b border-white/20 pb-4"
            >
              <div className="flex gap-4 items-center">
                <img
                  src={item.image}
                  className="w-16 h-16 object-contain bg-white rounded"
                />

                <div>
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {item.title}
                  </h3>
                  <p>₹ {item.price}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decrement(item.id)}
                  className="px-2 bg-red-500 rounded"
                >➖</button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increment(item.id)}
                  className="px-2 bg-green-500 rounded"
                >➕</button>
              </div>

              <p className="font-bold">
                ₹ {(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))
        )}

      </div>

      {/* RIGHT SUMMARY */}
      <div className='h-80 w-100 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-3xl p-10 ml-auto' >
        <div className="h-auto w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-3xl p-6 ml-auto text-white">

          <h2 className="text-lg font-semibold mb-4">Cart Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Total Products</span>
            <span>{totalProducts}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Total Quantity</span>
            <span>{totalQuantity}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Total Amount</span>
            <span>₹ {totalAmount.toFixed(2)}</span>
          </div>

          <button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl font-semibold">
            Checkout
          </button>

        </div>
      </div>

    </div>
  )
}

export default Cart;
