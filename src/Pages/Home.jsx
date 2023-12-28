import React from "react";
import { Link } from "react-router-dom";
import CartIcon from "./CartIcon";
import Categories from "./Categories";
import Accordion from "./Accordion";
import Stats from "./Stats";

function Home() {
  return (
    <div className="container mx-auto my-8">
      <div className="relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
        <div className="inset-y-0 top-0 right-0 -z-10 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
          <svg
            className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
            viewBox="0 0 100 100"
            fill="currentColor"
            preserveAspectRatio="none slice"
          >
            <path d="M50 0H100L50 100H0L50 0Z" />
          </svg>
          <img
            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
            src="https://imgtr.ee/images/2023/12/28/b70d7bb3854dde32a662f8fa89674800.jpeg"
            alt=""
          />
        </div>
        <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
          <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
            <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
              Brand new
            </p>
            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
              Everything you
              <br className="hidden md:block" />
              can imagine{" "}
              <span className="inline-block text-purple-700">is real</span>
            </h2>
            <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
              Shop the latest fashion trends online at low prices, with
              E-Bazaar. Over 1000 new products every day! Get Best Prices &amp;
              Biggest Discounts on Clothing, Tech &amp; Home Crafts.
            </p>
            <div className="flex items-center">
              <Link
                to="/products"
                className=" inline-flex items-center justify-center h-12 px-6 mr-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-violet-700 hover:bg-purple-900 focus:shadow-outline focus:outline-none"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Categories />
      <Stats />
      <Accordion />
      <CartIcon />
    </div>
  );
}

export default Home;
