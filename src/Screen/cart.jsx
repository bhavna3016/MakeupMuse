
import { useCart } from "../Component/cartContext";
import { useNavigate } from "react-router-dom";

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
  } = useCart();

  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="px-4 py-20 text-center sm:px-6">
        <h2 className="text-3xl font-semibold">
          Your bag is empty
        </h2>
        <p className="mt-2 text-xl text-gray-800">
          Add your favourite MakeupMuse products to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl min-w-0 px-4 py-10 sm:px-6">
      <h1 className="mb-8 text-4xl font-semibold">
        My Shopping Bag
      </h1>

      <div className="space-y-5">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex min-w-0 flex-wrap items-center gap-5 border-b pb-5 text-xl"
          >
            <img
              src={item.image}
              alt={item.name}
              className="h-30 w-30 shrink-0 rounded-md object-contain"
            />

            <div className="min-w-0 flex-1">
              <h3 className="break-words text-xl font-semibold">
                {item.name}
              </h3>

              <p className="mt-1 text-base text-gray-600">
                ₹{Number(
                  String(item.price).replace(/[₹,\s]/g, "")
                ).toLocaleString("en-IN")}
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity - 1)
                  }
                  disabled={item.quantity === 1}
                  className="rounded border px-3 py-1 disabled:opacity-40"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="rounded border px-3 py-1"
                >
                  +
                </button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-2 text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </div>

            <p className="ml-auto font-semibold">
              ₹{(
                Number(String(item.price).replace(/[₹,\s]/g, "")) *
                item.quantity
              ).toLocaleString("en-IN")}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <h2 className="text-xl font-semibold">
          Total: ₹{cartTotal.toLocaleString("en-IN")}
        </h2>

        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 rounded-md bg-black px-8 py-3 text-white hover:bg-gray-600"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
