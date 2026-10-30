
import { useState } from "react";
import { allProducts } from "./globaldata";
import { ProductDetail } from "../Products/productdetail";

export const GlobalSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const search = searchTerm.trim().toLowerCase();

  const filteredProducts = allProducts.filter((item) => {
    if (!search) return false;

    return [
      item.name,
      item.color,
      item.type,
      item.category,
    ].some((value) =>
      String(value || "").toLowerCase().includes(search)
    );
  });

  return (
    <div className="mx-auto w-full min-w-0 max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">
        Search Products
      </h1>

      <div className="mb-8 flex min-w-0 gap-2">
        <input
          type="search"
          placeholder="Search all makeup products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="min-w-0 flex-1 rounded-full border border-gray-400 px-5 py-3 outline-none focus:border-gray-500"
        />

        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="rounded-full border border-gray-400 px-4 py-2 text-gray-600 hover:bg-gray-200"
          >
            Clear
          </button>
        )}
      </div>

      {!search ? (
        <p className="py-8 text-center text-xl text-gray-600">
          Start typing to find products across all categories.
        </p>
      ) : filteredProducts.length > 0 ? (
        <div className="grid min-w-0 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((item, index) => (
            <div
              key={`${item.name}-${item.id}-${index}`}
              onClick={() => setSelectedProduct(item)}
              className="min-w-0 cursor-pointer rounded-lg border border-gray-300 bg-gray-50 p-3 transition hover:shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-40 w-full rounded-md object-contain sm:h-48"
              />

              <h2 className="mt-3 break-words text-center font-semibold text-gray-900">
                {item.name}
              </h2>

              <p className="mt-1 break-words text-center text-sm text-gray-500">
                {[item.color, item.type].filter(Boolean).join(" ")}
              </p>

              <p className="mt-2 text-center font-bold text-gray-900">
                ₹{item.price}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-xl text-gray-600">
          No products found. Try another product name.
        </p>
      )}

      {selectedProduct && (
        <ProductDetail
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

;
