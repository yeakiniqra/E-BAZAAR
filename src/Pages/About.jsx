import React,{useEffect} from "react";

const About = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="container mx-auto my-8 min-h-screen">
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl font-bold leading-9 text-gray-800 pb-4">
              About Us
            </h1>
            <p className="font-normal text-base leading-6 text-gray-600 ">
              Our mission is to provide the best quality products to our
                customers at the lowest prices possible. We take great pride in
                our company, our commitment to customer service and in the
                products we sell. Our online store is designed to provide you
                with a safe and secure environment to browse our product
                catalog.
            </p>
          </div>
          <div className="w-full  lg:w-8/12 ">
            <img
              className="w-full rounded-2xl h-full"
              src="https://shorturl.at/aeIU9"
              alt="A group of People"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
