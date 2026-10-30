import { newLaunchData, bannerData, categoryData, bestSellerData } from "../data";
import { useState, useEffect, useRef } from "react";
import { useCart } from "../Component/cartContext";
import { ProductDetail } from "./Products/productdetail";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useCart();

  const categoryRef = useRef(null);
  const newLaunchRef = useRef(null);
  const bestSellerRef = useRef(null);

  const slide = (ref, direction) => {
    ref.current?.scrollBy({
      left: direction * 350,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerData.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="group relative h-[220px] w-full overflow-hidden sm:h-[350px] md:h-[450px] lg:h-[550px]">
        <img
          key={bannerData[currentIndex].id}
          src={bannerData[currentIndex].image}
          alt={bannerData[currentIndex].title}
          className="h-full w-full object-cover"
        />

        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              prevIndex === 0 ? bannerData.length - 1 : prevIndex - 1
            )
          }
          aria-label="Previous banner"
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-xl text-black shadow-md transition hover:bg-white sm:left-5 sm:p-3 sm:text-2xl"
        >
          &#10094;
        </button>

        <button
          onClick={() =>
            setCurrentIndex((prevIndex) =>
              (prevIndex + 1) % bannerData.length
            )
          }
          aria-label="Next banner"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-xl text-black shadow-md transition hover:bg-white sm:right-5 sm:p-3 sm:text-2xl"
        >
          &#10095;
        </button>

        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-5">
          {bannerData.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to banner ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                currentIndex === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <h1 className="mt-7 text-center text-2xl font-semibold sm:text-3xl md:text-4xl">
        SHOP BY CATEGORY
      </h1>

      <div className="mt-2 flex justify-end gap-2 px-3 sm:px-4">
        <button
          onClick={() => slide(categoryRef, -1)}
          className="rounded-full border p-2 hover:bg-gray-200"
          aria-label="Previous categories"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => slide(categoryRef, 1)}
          className="rounded-full border p-2 hover:bg-gray-200"
          aria-label="Next categories"
        >
          <ChevronRight />
        </button>
      </div>

      <div
        ref={categoryRef}
        className="mt-1 flex gap-4 overflow-x-auto px-3 pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 sm:px-4"
      >
        {categoryData.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="w-[150px] shrink-0 text-center no-underline sm:w-[180px] md:w-[210px]"
          >
            <div className="overflow-hidden rounded-xl">
              <img
                src={item.image}
                alt={item.name}
                className="h-[150px] w-full object-cover transition duration-300 hover:scale-105 sm:h-[180px] md:h-[210px]"
              />
            </div>

            <h3 className="mt-3 text-xs font-bold tracking-[1px] text-black sm:mt-4 sm:text-sm sm:tracking-[2px]">
              {item.name}
            </h3>
          </Link>
        ))}
      </div>

      <h1 className="mt-7 text-center text-2xl font-semibold sm:text-3xl md:text-4xl">
        NEW LAUNCHES
      </h1>

      <div className="mt-2 flex justify-end gap-2 px-3 sm:px-4">
        <button
          onClick={() => slide(newLaunchRef, -1)}
          className="rounded-full border p-2 hover:bg-gray-200"
          aria-label="Previous new launches"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => slide(newLaunchRef, 1)}
          className="rounded-full border p-2 hover:bg-gray-200"
          aria-label="Next new launches"
        >
          <ChevronRight />
        </button>
      </div>

      <div
        ref={newLaunchRef}
        className="mt-1 flex gap-4 overflow-x-auto px-3 pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:px-4"
      >
        {newLaunchData.map((item) => (
          <div
            key={item.id}
            className="relative w-[250px] shrink-0 rounded-xl border border-gray-300 sm:w-[300px] md:w-[400px]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-[220px] w-full cursor-pointer rounded-t-xl object-cover sm:h-[260px] md:h-[300px]"
              onClick={() => setSelectedProduct(item)}
            />

            <div className="absolute left-2 top-2 z-10 bg-black px-2 py-1">
              <h3 className="text-center font-bold text-white">
                {item.badge}
              </h3>
            </div>

            <h3 className="mt-2 p-2 text-center text-base font-semibold sm:text-lg">
              {item.name}
            </h3>

            <h3 className="p-1 text-center font-bold">
              Rs. {item.price}
            </h3>

            <h3 className="p-1 text-center font-bold">
              ⭐ {item.rating}
            </h3>

            <button
              onClick={() => {
                addToCart(item);
                toast.success("Product added to cart successfully!");
              }}
              className="mx-2 mb-3 w-[calc(100%-16px)] rounded-lg bg-black px-3 py-3 text-base font-bold text-white hover:bg-gray-700 sm:text-lg"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <h1 className="mt-7 text-center text-2xl font-semibold sm:text-3xl md:text-4xl">
        BEST SELLERS
      </h1>

      <div className="mt-2 flex justify-end gap-2 px-3 sm:px-4">
        <button
          onClick={() => slide(bestSellerRef, -1)}
          className="rounded-full border p-2 hover:bg-gray-200"
          aria-label="Previous best sellers"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => slide(bestSellerRef, 1)}
          className="rounded-full border p-2 hover:bg-gray-200"
          aria-label="Next best sellers"
        >
          <ChevronRight />
        </button>
      </div>

      <div
        ref={bestSellerRef}
        className="mt-1 flex gap-4 overflow-x-auto px-3 pb-4 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-6 sm:px-4"
      >
        {bestSellerData.map((item) => (
          <div
            key={item.id}
            className="relative w-[250px] shrink-0 rounded-xl border border-gray-300 sm:w-[300px] md:w-[400px]"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-[220px] w-full cursor-pointer rounded-t-xl object-cover sm:h-[260px] md:h-[300px]"
              onClick={() => setSelectedProduct(item)}
            />

            <div className="absolute left-2 top-2 z-10 bg-black px-2 py-1">
              <h3 className="text-center font-bold text-white">
                {item.badge}
              </h3>
            </div>

            <h3 className="mt-2 p-2 text-center text-base font-semibold sm:text-lg">
              {item.name}
            </h3>

            <h3 className="p-1 text-center font-bold">
              Rs. {item.price}
            </h3>

            <h3 className="p-1 text-center font-bold">
              ⭐ {item.rating}
            </h3>

            <button
              onClick={() => {
                addToCart(item);
                toast.success("Product added to cart successfully!");
              }}
              className="mx-2 mb-3 w-[calc(100%-16px)] rounded-lg bg-black px-3 py-3 text-base font-bold text-white hover:bg-gray-700 sm:text-lg"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 w-full sm:mt-10">
        <img
          className="h-auto w-full"
          src="https://www.sugarcosmetics.com/cdn/shop/files/app-download-LP-1600x250.jpg?v=1780652345&width=1600"
          alt="Download the app"
        />
      </div>

      <div className="mt-6 w-full sm:mt-10">
        <img
          className="h-auto w-full"
          src="https://www.sugarcosmetics.com/cdn/shop/files/Buy-5-at-1699_-LP_1600x400_34c8c192-3f9a-4d1a-92d5-4262e3e59883.gif?v=1791539232&width=1600"
          alt="Special makeup offers"
        />
      </div>

      <div className="mt-8 flex w-full flex-col gap-4 md:mt-12 md:flex-row md:gap-0">
        <div className="w-full md:w-1/2">
          <img
            className="h-64 w-full object-cover sm:h-80 md:h-full"
            src="https://www.sugarcosmetics.com/cdn/shop/files/800x450.jpg?v=1780658111&width=800"
            alt="Makeup brand founder"
          />
        </div>

        <div className="flex w-full flex-col justify-center bg-gray-200 px-5 py-8 sm:px-8 sm:py-12 md:w-1/2 md:px-12 md:py-16">
          <h1 className="mb-5 text-center text-2xl font-semibold tracking-[2px] text-gray-900 sm:mb-8 sm:text-3xl sm:tracking-[4px] md:text-4xl">
            NOTE FROM FOUNDER
          </h1>

          <p className="text-justify text-sm font-bold leading-7 text-black sm:text-base md:text-lg md:leading-8">
            We built SUGAR with one belief: Indian women shouldn't have to settle.
            Not for the wrong shade, not for the wrong formula, not for a brand that
            wasn't thinking about them. Every product we make is our way of saying:
            you were always the standard.
          </p>

          <p className="mt-4 text-justify text-sm font-bold leading-7 text-black sm:mt-5 sm:text-base md:text-lg md:leading-8">
            We started SUGAR because Indian women deserved makeup that was made for
            them—not borrowed from the West and adjusted later. Every shade, every
            product we create is built to match real Indian skin tones and real
            Indian lives. Beauty should make you feel powerful, not left out.
          </p>
        </div>
      </div>

      <hr className="mt-8 border-gray-300 sm:mt-10" />

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      <div className="bg-gray-100 px-4 pb-5 pt-6 sm:px-8 sm:pt-8 md:px-20">
        <h1 className="text-center text-2xl font-semibold tracking-[2px] text-gray-900 sm:text-3xl sm:tracking-[4px] md:text-4xl">
          DISCLAIMER
        </h1>

        <h4 className="mx-auto mt-4 max-w-4xl px-1 text-center text-sm leading-6 text-gray-900 sm:text-base md:text-lg md:leading-7">
          We do not request any additional payment once an order is successfully
          placed, especially for prepaid orders. Any calls, messages, QR codes, or
          payment links requesting extra payment are fraudulent and not associated
          with us. Please do not share personal or payment information or scan
          unknown QR codes.
        </h4>
      </div>
    </>
  );
};