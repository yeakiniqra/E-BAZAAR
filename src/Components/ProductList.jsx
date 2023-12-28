import React, { useEffect, useState } from "react";
import { useShoppingCart } from "../Contexts/ShoppingCartContext";
import { fetchProducts } from "../Utils/Api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CartIcon from "../Pages/CartIcon";
import "../App.css";

const ProductList = () => {
  const { addToCart, addedToCartIds } = useShoppingCart();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isItemAdded, setIsItemAdded] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  useEffect(() => {
    // Apply category filter
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  useEffect(() => {
    // Reset isItemAdded to false after a short delay (adjust as needed)
    const timeout = setTimeout(() => {
      setIsItemAdded(false);
    }, 1000);

    // Clear the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, [isItemAdded]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = (productId) => {
    setIsItemAdded(true);
    addToCart(productId);
    toast.success("Added to cart", { position: "top-center", autoClose: 1000 });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="container mx-auto my-8 min-h-screen">
      <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-center p-4 rounded-lg shadow-md mb-7">
        <h2 className="text-3xl font-bold text-white mb-2">
          Get Your Desired Product from Featured Category!
        </h2>
        <p className="text-lg text-gray-100 font-normal text-white-50">
          Tap the products below to see details
        </p>
      </div>

      {/* Category Filter UI */}
      <div className="mb-4 flex items-center justify-center">
        <label className="text-gray-700 mr-2 font-bold">
          Filter by Category:
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className=" py-2 px-4 border border-gray-300 rounded-md leading-tight focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="groceries">Groceries</option>
          <option value="sunglasses">Sunglasses</option>
          <option value="automotive">Automotive</option>
          <option value="motorcycle">Motorcycle</option>
          <option value="lighting">Lighting</option>
          <option value="home-decoration">Home-decoration</option>
          <option value="furniture">Furniture</option>
          <option value="tops">Tops</option>
          <option value="womens-dresses">WomensWear</option>
          <option value="womens-shoes">Womens-shoes</option>
          <option value="mens-shirts">Mens-shirts</option>
          <option value="mens-shoes">Mens-shoes</option>
          <option value="mens-watches">Mens-watches</option>
          <option value="womens-watches">Womens-watches</option>
          <option value="womens-bags">Womens-bags</option>
          <option value="womens-jewellery">Womens-jewellery</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-4 h-4 fill-current text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 12.75a1 1 0 01-.7-.29l-3.7-3.71a1 1 0 011.41-1.42L10 10.58l3.29-3.3a1 1 0 011.41 1.42l-4 4a1 1 0 01-.71.29z"></path>
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
          >
            <Link
              to={`/products/${product.id}`}
              className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
              href="#"
            >
              <img
                className="object-cover"
                src={product.thumbnail}
                alt={product.title}
              />
              <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                {product.discountPercentage}% OFF
              </span>
            </Link>
            <div className="mt-4 px-5 pb-5">
              <Link to={`/products/${product.id}`}>
                <h5 className="text-xl tracking-tight text-slate-900">
                  {product.title}
                </h5>
              </Link>
              <div className="mt-2 mb-5 flex items-center justify-between">
                <p>
                  <span className="text-3xl font-bold text-slate-900">
                    ${product.price}
                  </span>
                </p>
                <div className="flex items-center">
                  {Array.from(
                    { length: Math.floor(product.rating) },
                    (_, index) => (
                      <svg
                        key={index}
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    )
                  )}
                  {/* Assuming product.rating is a decimal, and we round it to the nearest half */}
                  {Array.from(
                    { length: Math.floor((product.rating % 1) * 2) },
                    (_, index) => (
                      <svg
                        key={index}
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    )
                  )}
                  <span className="mr-2 ml-3 rounded bg-yellow-400 px-2.5 py-0.5 text-xs font-semibold">
                    {product.rating}
                  </span>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className={`flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
                  addedToCartIds.includes(product.id)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={addedToCartIds.includes(product.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <CartIcon animate={isItemAdded} />
    </div>
  );
};

export default ProductList;
