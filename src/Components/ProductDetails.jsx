import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../Utils/Api";
import { useShoppingCart } from "../Contexts/ShoppingCartContext";
import { toast } from "react-toastify";
import CartIcon from "../Pages/CartIcon";
import ProductDetailsPage from "../Pages/ProductDetailsPage";

import Slider from "react-slick";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart, addedToCartIds } = useShoppingCart();

  useEffect(() => {
    const getProductDetails = async () => {
      const data = await fetchProducts();
      const selectedProduct = data.find((p) => p.id === parseInt(id, 10));
      setProduct(selectedProduct);
    };

    getProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success("Added to Cart", { position: "top-center", autoClose: 1000 });
  };

  const sliderSettings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={product.images[i]} alt={`Thumbnail ${i + 1}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto my-8 min-h-screen">
      <h2 className="text-3xl font-bold p-3 mb-4">{product.title}</h2>
      <div className="grid grid-cols-1 p-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Slider {...sliderSettings}>
          {product.images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="mb-4 w-60 h-60 object-cover"
              />
            </div>
          ))}
        </Slider>
        <div className="p-3">
          <p className="text-gray-600 font-semibold mb-2">
            Description: {product.description}
          </p>
          <p className="text-gray-900 text-xl font-semibold mb-2">
            Price: ${product.price}
          </p>
          <p className="text-gray-700 font-semibold mb-2">
            Brand: {product.brand}
          </p>
          <p className="text-gray-700 font-semibold mb-2">
            Discount:{" "}
            <span className="text-red-500">{product.discountPercentage}%</span>
          </p>
          <p className="text-gray-700 font-semibold mb-2">
            Rating: {product.rating}
          </p>
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
      <CartIcon />
      <ProductDetailsPage />
    </div>
  );
};

export default ProductDetails;
