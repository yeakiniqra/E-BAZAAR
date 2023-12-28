import { Link } from "react-router-dom";
import React,{useEffect} from "react";
import { useShoppingCart } from "../Contexts/ShoppingCartContext";
import "../App.css";
import CartPlus from "../Pages/CartPlus";

const ShoppingCart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeItemFromCart } = useShoppingCart();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleIncreaseQuantity = (productId) => {
    increaseQuantity(productId);
  };

  const handleDecreaseQuantity = (productId) => {
    decreaseQuantity(productId);
  };

  const handleRemoveItem = (productId) => {
    removeItemFromCart(productId);
  };

  // Calculate total price for each item
  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  // Calculate total price for the entire cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      const itemTotal = calculateItemTotal(item.price, item.quantity);
      return isNaN(itemTotal) ? total : total + itemTotal;
    }, 0);
  };

  return (
    <div className="container overflow-hidden min-h-screen mx-auto my-8">
      <h2 className="text-3xl text-center font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? (
         <div>
        <p className="empty-cart-message " >Your cart is empty.</p>
        <CartPlus />
        </div>
      ) : (
        <div>
          <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="mb-4 w-full h-40 object-cover rounded-md shadow-md"
                />
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-700 font-semibold mb-2">
                  Price: ${item.price}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleDecreaseQuantity(item.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none border rounded-l px-3 py-2 transition duration-300 ease-in-out"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20 12H4"
                        ></path>
                      </svg>
                    </button>
                    <span className="mx-2">{item.quantity}</span>
                    <button
                      onClick={() => handleIncreaseQuantity(item.id)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none border rounded-r px-3 py-2 transition duration-300 ease-in-out"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        ></path>
                      </svg>
                    </button>
                  </div>

                  <p className="text-gray-700 font-semibold">
                    ${calculateItemTotal(item.price, item.quantity)}
                  </p>

                 {/* Remove button */}
                 <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 font-semibold hover:text-red-700 focus:outline-none px-2 transition duration-300 ease-in-out"
                  >
                    Remove
                  </button> 
                </div>
              </div>
            ))}
          </div>

          {/* Total Price */}
          <div className="mt-8">
            <p className="text-2xl p-4 font-bold">
              Total Amount: ${calculateTotalPrice()}
            </p>
          </div>

          {/* Back to Home Button */}
          <div className="mt-8 flex justify-center space-x-4">
            <Link
              to="/products"
              className="bg-purple-500 hover:bg-purple-800 rounded-xl text-white py-2 px-3"
            >
              Back to Shopping
            </Link>
            <Link
              to="/checkout"
              className="bg-indigo-500 hover:bg-indigo-800 rounded-xl text-white py-2 px-3"
            >
              Continue to Checkout
            </Link>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default ShoppingCart;
