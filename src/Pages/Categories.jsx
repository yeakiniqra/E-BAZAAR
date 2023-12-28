import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    { id: 1, name: "WomensWear", image: "https://shorturl.at/eJPSU" },
    { id: 2, name: "Shoes", image: "https://shorturl.at/zDIV5" },
    { id: 3, name: "Watches", image: "https://shorturl.at/ajmSZ" },
    { id: 4, name: "Accessories", image: "https://shorturl.at/gimp6" },
    { id: 5, name: "MensWear", image: "https://shorturl.at/AHRWY" },
    { id: 6, name: "Skin Care", image: "https://rb.gy/v66z2q" },
    { id: 7, name: "Home & Living", image: "https://shorturl.at/jkpyY" },
    { id: 8, name: "Gadgets", image: "https://shorturl.at/fpqX0" },
    { id: 9, name: "Groceries", image: "https://shorturl.at/IKN15" },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="2xl:mx-auto 2xl:container py-12 px-4 sm:px-6 xl:px-20 2xl:px-0 w-full">
        <div className="flex flex-col justify-center items-center space-y-10">
          <div className="flex flex-col justify-center items-center ">
            <h1 className="text-2xl xl:text-2xl font-sans tracking-tight font-semibold leading-7 xl:leading-9 text-gray-800">
              Uncover Your Next Favorite Find <span><box-icon type='solid' name='shopping-bag'></box-icon></span>
            </h1>
            <h2 className="text-lg xl:text-lg font-sans tracking-normal font-normal leading-6 xl:leading-8 text-gray-600">
              Browse, get inspired, and fall in love with something new.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-4 w-full">
            {categories.map((category) => (
              <div
                key={category.id}
                className="relative group flex justify-center items-center h-full w-full"
              >
                <img
                  className="object-center object-cover h-full w-full"
                  src={category.image}
                  alt={`${category.name}-image`}
                />
                <Link to="/products" className="focus:outline-none text-center rounded-2xl focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 bottom-4 z-10 absolute text-base font-medium leading-none text-gray-100 px-4 py-3 w-36 bg-slate-800">
                  {category.name}
                </Link>
                <div className="absolute opacity-0 rounded-2xl group-hover:opacity-100 transition duration-500 bottom-3 py-6 z-0 px-20 w-36 bg-white bg-opacity-50"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
