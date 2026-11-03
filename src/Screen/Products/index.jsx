import { ProductDetail } from "./productdetail";
import { useState } from "react";
import { useCart } from "../../Component/cartContext";
import { toast } from "react-toastify";

export const Product = ({ title, products = [], banner }) => {
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2499);
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { addToCart } = useCart();

  let filteredProducts = products.filter((item) => {
    const price = Number(item.price) || 0;
    const matchesStock = !inStockOnly || item.inStock !== false;
    const matchesPrice = price >= minPrice && price <= maxPrice;

    return matchesStock && matchesPrice;
  });

  if (sortBy === "priceLowHigh") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "priceHighLow") {
    filteredProducts.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <div className="w-full min-w-0 bg-white text-black">
      {banner && (
        <img
          src={banner}
          alt={title}
         className="h-auto w-full object-contain md:h-120 md:object-cover"
        />
      )}

      <div className="border-b border-gray-200 py-3 text-center">
        <h1 className="text-2xl font-normal tracking-[3px] md:text-4xl">
          {title}
        </h1>
      </div>

      <div className="flex justify-end border-b border-gray-200 px-1 py-1 md:px-8">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="max-w-full cursor-pointer border border-gray-200 bg-white px-4 py-3 text-sm tracking-widest outline-none"
          aria-label="Sort products"
        >
          <option value="default">SORT BY</option>
          <option value="priceLowHigh">Price: Low to High</option>
          <option value="priceHighLow">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div  className="grid min-w-0 grid-cols-1 gap-8 px-2 py-2 md:grid-cols-[220px_minmax(0,1fr)] md:px-4 md:py-8 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-4">
        <aside className="h-fit min-w-0 self-start md:sticky md:top-24">
          <div className="border-b border-gray-300 pb-1">
            <h2 className="mb-5 text-sm tracking-[3px]">
              AVAILABILITY
            </h2>
          </div>

          <div className="border-b border-gray-300 py-2">
            <h2 className="mb-5 text-sm tracking-[3px]">PRICE</h2>

            <div className="mb-5 flex items-center justify-between gap-3">
              <label className="flex w-1/2 min-w-0 items-center border border-gray-200 px-2">
                <span className="text-gray-500">₹</span>
                <input
                  type="number"
                  min="0"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(Math.max(0, Number(e.target.value)))
                  }
                  className="w-full min-w-0 p-2 text-right outline-none"
                  aria-label="Minimum price"
                />
              </label>

              <span className="text-gray-500">to</span>

              <label className="flex w-1/2 min-w-0 items-center border border-gray-200 px-2">
                <span className="text-gray-500">₹</span>
                <input
                  type="number"
                  min="0"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(Math.max(0, Number(e.target.value)))
                  }
                  className="w-full min-w-0 p-2 text-right outline-none"
                  aria-label="Maximum price"
                />
              </label>
            </div>

            <input
              type="range"
              min="0"
              max="5000"
              step="50"
              value={Math.min(maxPrice, 5000)}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full cursor-pointer accent-black"
              aria-label="Maximum price slider"
            />

            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>₹0</span>
              <span>₹5000</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setInStockOnly(false);
              setMinPrice(0);
              setMaxPrice(2499);
              setSortBy("default");
            }}
            className="mt-5 text-sm underline underline-offset-4"
          >
            Clear all filters
          </button>
        </aside>

        <section className="min-w-0">
          {filteredProducts.length > 0 ? (
            <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((item) => (
                <div key={item.id} className="min-w-0 bg-gray-50 border border-gray-200 rounded-md">
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-70 aspect-[4/5] w-full cursor-pointer object-cover"
                      onClick={() => setSelectedProduct(item)}
                    />

                    {item.badge && (
                      <span className="absolute left-2 top-2 max-w-[90%] truncate bg-black px-2 py-1 text-[10px] font-semibold tracking-wider text-white sm:text-xs">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0 pt-3">
                    <h3 className="line-clamp-2 min-h-10 text-center text-xs font-medium tracking-wider sm:text-sm">
                      {item.name}
                    </h3>

                    <p className="text-center text-sm">
                      ⭐ {item.rating ?? "N/A"}
                    </p>

                    <p className="mt-2 text-center text-sm font-bold">
                      Rs. {Number(item.price).toFixed(2)}
                    </p>

                    <div className="flex justify-center px-2 pb-2">
                      <button
                        type="button"
                        onClick={() => {
                          addToCart(item);
                          toast.success("Product added to cart successfully!");
                        }}
                        className="mt-3 h-13 w-full max-w-65 rounded-lg bg-black px-2 py-3 text-xs font-bold tracking-wide text-white transition hover:bg-gray-800 sm:text-base"
                      >
                        ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h2 className="text-lg font-semibold">
                No products found
              </h2>
              <p className="mt-2 text-sm text-gray-500">
                Try changing your price range or filters.
              </p>
            </div>
          )}
        </section>
      </div>

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Product;