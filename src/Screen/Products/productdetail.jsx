import { useCart } from "../../Component/cartContext";
import { toast } from "react-toastify";

export const ProductDetail = ({ product, onClose }) => {
  const { addToCart } = useCart();

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Product added to cart successfully!");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-3 sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative my-auto grid w-full max-w-4xl grid-cols-1 overflow-visible rounded-xl bg-[#fff7f9] shadow-xl md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-[110] flex h-10 w-10 items-center justify-center rounded-full bg-white text-3xl leading-none text-gray-700 shadow-md hover:text-black"
          aria-label="Close product details"
        >
          &times;
        </button>

        <div className="flex min-w-0 items-center justify-center rounded-t-xl bg-[#fff7f9] p-4 md:rounded-l-xl md:rounded-tr-none">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full max-w-full object-contain sm:h-80 md:h-[450px]"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-center bg-[#fff7f9] p-6 pt-16 md:p-8 md:pt-8">
          {product.badge && (
            <span className="mb-3 w-fit rounded bg-black px-3 py-1 text-sm text-white">
              {product.badge}
            </span>
          )}

          <h2 className="mb-3 break-words text-2xl font-semibold text-gray-900">
            {product.name}
          </h2>

          {product.rating != null && (
            <p className="mb-3 text-sm text-gray-600">
              ⭐ {product.rating} / 5
            </p>
          )}

          <p className="mb-4 text-2xl font-bold text-black">
            ₹{product.price}
          </p>

          {product.color && (
            <p className="mb-2 break-words text-gray-700">
              <span className="font-semibold">Color:</span> {product.color}
            </p>
          )}

          {product.type && (
            <p className="mb-3 break-words text-gray-700">
              <span className="font-semibold">Type:</span> {product.type}
            </p>
          )}

          <p className="mb-6 break-words leading-7 text-gray-600">
            {product.description ||
              "Discover this beauty essential from MakeupMuse."}
          </p>

          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full rounded-md bg-black px-6 py-3 font-semibold text-white transition hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};
