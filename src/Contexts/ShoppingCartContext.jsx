// ShoppingCartContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProducts } from '../Utils/Api';

const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [addedToCartIds, setAddedToCartIds] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await fetchProducts();
      setProducts(productData);
    };

    fetchData();
  }, []);

  const addToCart = (productId) => {
    const selectedProduct = products.find((product) => product.id === productId);

    setAddedToCartIds((prevIds) => [...prevIds, productId]);

    // Use the callback form to ensure we work with the latest state
    setCart((prevCart) => {
      // Check if the product is already in the cart
      const existingProduct = prevCart.find((item) => item.id === productId);

      if (existingProduct) {
        // If the product is already in the cart, update its quantity
        return prevCart.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // If the product is not in the cart, add it with quantity 1
        return [...prevCart, { ...selectedProduct, quantity: 1 }];
      }
    });
  };

 const increaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      return updatedCart;
    });
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === productId && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return updatedCart;
    });
  };

  const removeItemFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    setAddedToCartIds((prevIds) => prevIds.filter((id) => id !== productId));
  };

  const deliveryFee = 5; // Set your desired delivery fee

  // Calculate total price for each item
  const calculateItemTotal = (price, quantity) => {
    return price * quantity;
  };

  // Calculate total price for the entire cart
  const calculateTotalPrice = () => {
    const subtotal = cart.reduce((total, item) => {
      const itemTotal = calculateItemTotal(item.price, item.quantity);
      return isNaN(itemTotal) ? total : total + itemTotal;
    }, 0);

    // Add delivery fee to the subtotal
    return subtotal + deliveryFee;
  };

  const resetCart = () => {
    setCart([]);
    setAddedToCartIds([]);
  };
  
  // ... other cart-related functions

  return (
    <ShoppingCartContext.Provider value={{ cart, addedToCartIds, addToCart, increaseQuantity, decreaseQuantity,calculateTotalPrice,removeItemFromCart,resetCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = () => {
  return useContext(ShoppingCartContext);
};
