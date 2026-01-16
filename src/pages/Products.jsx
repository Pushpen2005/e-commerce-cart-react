import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'
import { useCart } from "../context/CartContext";

const Products = () => {
  const { data, fetchAllProducts } = getData();
  const { cart = [], addToCart, increment, decrement } = useCart();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  return (
    <div className="min-h-screen w-full py-10 px-4 sm:px-6 lg:px-20 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]">

      <div className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-10 mb-6 flex flex-wrap justify-center gap-6">

        {data?.map((item, index) => {

          const cartItem = cart.find(p => p.id === item.id);

          return (
            <div
              key={item.id || index}
              className="flex flex-col w-72 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl p-6"
            >

              <div className="h-48 w-full bg-black rounded-2xl shadow-2xl mb-4 overflow-hidden flex items-center justify-center">
                <img
                  className="h-full w-full object-contain"
                  src={item?.image}
                  alt={item?.title}
                />
              </div>

              <h1 className="text-white text-sm font-bold line-clamp-2">
                {item?.title}
              </h1>

              {!cartItem ? (
                <button
                  onClick={() => addToCart(item)}
                  className="mt-4 bg-blue-500 hover:bg-blue-600 transition text-white py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="mt-4 flex items-center justify-between bg-white/20 rounded px-3 py-1">

                  <button onClick={() => decrement(item.id)}>➖</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => increment(item.id)}>➕</button>

                </div>
              )}

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Products;
