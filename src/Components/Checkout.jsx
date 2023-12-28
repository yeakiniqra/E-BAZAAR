import React, { useState, useEffect } from "react";
import { useShoppingCart } from "../Contexts/ShoppingCartContext";
import { jsPDF } from "jspdf";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, calculateTotalPrice,resetCart } = useShoppingCart();
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  const navigate = useNavigate();

  const confirmPayment = () => {
    alert(
      `Payment Success.You will receive payment receipt shortly at ${customerEmail}.`
    );
    resetCart();
    navigate("/");
  };

  const generateReceiptPDF = () => {
    // Create a new jsPDF instance
    const pdfDoc = new jsPDF();

    // Header
    pdfDoc.setFontSize(20);
    pdfDoc.text("Payment Receipt", 100, 20, "center");

    // Separator
    pdfDoc.line(20, 35, 180, 35);

    // Get purchased products from the cart
    const purchasedProducts = cart.map((item) => ({
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      total: item.quantity * item.price,
    }));

    // Calculate total price
    const totalPrice = calculateTotalPrice();

    // Add content to the PDF
    pdfDoc.setFontSize(12);
    pdfDoc.text(`Customer Name: ${customerName}`, 20, 45);
    pdfDoc.text(`Customer Email: ${customerEmail}`, 20, 60);

    pdfDoc.text("Purchased Products:", 20, 80);
    purchasedProducts.forEach((product, index) => {
      pdfDoc.text(
        `${index + 1}. ${product.title} x${
          product.quantity
        } - $${product.total.toFixed(2)}`,
        30,
        95 + index * 15
      );
    });

    pdfDoc.text(
      `Total Price: $${totalPrice.toFixed(2)}`,
      20,
      110 + purchasedProducts.length * 15
    );

    // Footer
    const footerY = pdfDoc.internal.pageSize.getHeight() - 50; // Position at bottom with a margin of 50
    pdfDoc.setFontSize(15);
    pdfDoc.text("Thank you for your purchase!", 100, footerY, "center");

    // Add centered logo below footer text
    const logoWidth = 50; // Adjust as needed
    const logoHeight = 20; // Adjust as needed
    const logoX = (pdfDoc.internal.pageSize.getWidth() - logoWidth) / 2; // Center horizontally
    const logoY = footerY + 10; // Position below footer text with a 10-point gap
    pdfDoc.addImage(
      "https://i.postimg.cc/j2h6h5Tz/ebazar.png",
      "PNG",
      logoX,
      logoY,
      logoWidth,
      logoHeight
    );
    // Save the PDF
    pdfDoc.save("payment_receipt.pdf");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative mx-auto w-full bg-white">
      <div className="grid min-h-screen grid-cols-10">
        <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
          <div className="mx-auto w-full max-w-lg">
            <h1 className="relative text-2xl font-medium text-gray-700 sm:text-3xl">
              Secure Checkout
              <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
            </h1>
            <form action="" className="mt-10 flex flex-col space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-gray-500"
                >
                  Email
                </label>
                <input
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="demo@example.com"
                  className="mt-1 block w-full rounded border-gray-100 bg-gray-200 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="card-number"
                  className="text-sm font-semibold text-gray-500"
                >
                  Card number
                </label>
                <input
                  type="text"
                  id="card-number"
                  name="card-number"
                  placeholder="1234-5678-XXXX-XXXX"
                  className="block w-full rounded border-gray-300 bg-gray-200 py-3 px-4 pr-10 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
                <img
                  src="https://i.postimg.cc/BbCfnsGh/visa-card.png"
                  alt=""
                  className="absolute bottom-3 right-3 max-h-4"
                />
              </div>
              <div>
                <label
                  htmlFor="card-name"
                  className="text-sm font-semibold text-gray-500"
                >
                  Card name
                </label>
                <input
                  type="text"
                  id="card-name"
                  name="card-name"
                  placeholder="Name on the card"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1 block w-full rounded border-gray-300 bg-gray-200 py-3 px-4 text-sm placeholder-gray-300 shadow-sm outline-none transition focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <button
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                  confirmPayment();
                  generateReceiptPDF();
                }}
                className="mt-4 inline-flex w-full items-center justify-center rounded bg-teal-600 py-2.5 px-4 text-base font-semibold tracking-wide text-white text-opacity-80 outline-none ring-offset-2 transition hover:text-opacity-100 focus:ring-2 focus:ring-teal-500 sm:text-lg"
              >
                Pay ${calculateTotalPrice()}
              </button>
            </form>
          </div>
        </div>
        <div className="relative bg-teal-900 col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
          <h2 className="sr-only">Order summary</h2>
          <div>
            {/* Shopping cart items */}
            <ul className="space-y-5">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <div className="inline-flex">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="max-h-16 rounded-lg"
                    />
                    <div className="ml-3">
                      <p className="text-base font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-sm font-medium text-white text-opacity-80">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-white">
                    ${item.price}
                  </p>
                </li>
              ))}
            </ul>
            <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
            <div className="space-y-2">
              {/* Total price */}
              <p className="flex justify-between text-gray-300">
                <span>Delivery charge:</span>
                <span>$5.00</span>
              </p>
              <p className="flex justify-between text-lg font-bold text-white">
                <span>Total price:</span>
                <span>${calculateTotalPrice()}</span>
              </p>
              {/* ... (other summary details) */}
            </div>
          </div>
          <div className="relative mt-10 text-white">
            <h3 className="mb-5 text-lg font-bold">Support</h3>
            <p className="mt-1 text-sm font-semibold">
              support@ebazaar.com <span className="font-light">(Email)</span>
            </p>
            <p className="mt-2 text-xs font-medium">
              Call us now for payment related issues
            </p>
          </div>
          <div className="relative mt-10 flex">
            <p className="flex flex-col">
              <span className="text-sm font-bold text-white">
                Money Back Guarantee
              </span>
              <span className="text-xs font-medium text-white">
                within 30 days of purchase
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
