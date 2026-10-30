
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useCart } from "../Component/cartContext";
import { useAuth } from "../Component/AuthContext";

export const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  const initialState = {
    fullName: user?.name || "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  };

  const formik = useFormik({
    initialValues: initialState,

    validationSchema: yup.object({
      fullName: yup
        .string()
        .trim()
        .required("Please enter your full name")
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name cannot exceed 50 characters")
        .matches(
          /^[a-zA-Z][a-zA-Z\s.'-]*$/,
          "Please enter a valid name"
        ),

      phone: yup
        .string()
        .required("Please enter your mobile number")
        .matches(
          /^[6-9]\d{9}$/,
          "Enter a valid 10-digit Indian mobile number"
        ),

      street: yup
        .string()
        .trim()
        .required("Please enter your house number, street and area")
        .min(5, "Address must be at least 5 characters")
        .max(150, "Address cannot exceed 150 characters"),

      city: yup
        .string()
        .trim()
        .required("Please enter your city")
        .min(2, "City must be at least 2 characters")
        .max(50, "City cannot exceed 50 characters")
        .matches(
          /^[a-zA-Z][a-zA-Z\s.'-]*$/,
          "Please enter a valid city name"
        ),

      state: yup
        .string()
        .trim()
        .required("Please enter your state")
        .min(2, "State must be at least 2 characters")
        .max(50, "State cannot exceed 50 characters")
        .matches(
          /^[a-zA-Z][a-zA-Z\s.'-]*$/,
          "Please enter a valid state name"
        ),

      pincode: yup
        .string()
        .required("Please enter your PIN code")
        .matches(/^\d{6}$/, "Enter a valid 6-digit PIN code"),
    }),

    onSubmit: (values, { setSubmitting }) => {
      if (!cartItems || cartItems.length === 0) {
        toast.error("Your cart is empty. Please add products first.");
        setSubmitting(false);
        return;
      }

      const newOrder = {
        orderId: `MM${Date.now().toString().slice(-8)}`,
        customer: {
          ...values,
          fullName: values.fullName.trim(),
          street: values.street.trim(),
          city: values.city.trim(),
          state: values.state.trim(),
        },
        items: cartItems.map((item) => ({ ...item })),
        total: cartTotal,
        date: new Date().toLocaleString("en-IN"),
      };

      setOrder(newOrder);
      clearCart();
      toast.success("Order placed successfully!");

      setSubmitting(false);
    },
  });

  if (order) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-12">
        <div className="mx-auto w-full min-w-0 max-w-2xl bg-white p-6 sm:p-10">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-700">
              ✓
            </div>

            <h1 className="text-3xl font-bold">Thank You!</h1>

            <p className="mt-2 text-gray-600">
              Your order has been placed successfully.
            </p>

            <p className="mt-5 text-sm text-gray-500">Order ID</p>
            <p className="break-words text-lg font-bold">{order.orderId}</p>
            <p className="mt-1 text-sm text-gray-500">{order.date}</p>
          </div>

          <hr className="my-6" />

          <h2 className="mb-4 text-xl font-bold">Order Receipt</h2>

          <div className="space-y-4">
            {order.items.map((item, index) => (
              <div
                key={item.id ?? `${item.name}-${index}`}
                className="flex min-w-0 flex-wrap items-center gap-4 border-b pb-4"
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 object-contain"
                  />
                )}

                <div className="min-w-0 flex-1">
                  <p className="break-words font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="ml-auto font-semibold">
                  ₹
                  {(
                    Number(item.price) * Number(item.quantity || 1)
                  ).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap justify-between gap-2 text-lg font-bold">
            <span>Total Paid</span>
            <span>₹{Number(order.total).toFixed(2)}</span>
          </div>

          <div className="mt-6 break-words bg-gray-50 p-4 text-sm leading-6">
            <h3 className="font-bold">Delivery Address</h3>
            <p>{order.customer.fullName}</p>
            <p>{order.customer.phone}</p>
            <p>{order.customer.street}</p>
            <p>
              {order.customer.city}, {order.customer.state} -{" "}
              {order.customer.pincode}
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-8 w-full bg-black py-3 font-semibold text-white hover:bg-gray-800"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10">
      <div className="mx-auto w-full min-w-0 max-w-6xl">
        <h1 className="mb-8 text-center text-3xl font-bold">
          Checkout
        </h1>

        {!cartItems || cartItems.length === 0 ? (
          <div className="bg-white p-8 text-center">
            <p className="text-lg">Your cart is empty.</p>

            <button
              type="button"
              onClick={() => navigate("/")}
              className="mt-5 bg-black px-6 py-3 text-white"
            >
              SHOP NOW
            </button>
          </div>
        ) : (
          <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-3">
            <form
              onSubmit={formik.handleSubmit}
              className="min-w-0 space-y-5 bg-white p-6 sm:p-8 md:col-span-2"
            >
              <h2 className="text-xl font-bold">Delivery Details</h2>

              {[
                ["fullName", "Full name", "text", "name"],
                ["phone", "10-digit mobile number", "tel", "tel"],
                ["street", "House number, street and area", "text", "street-address"],
                ["city", "City", "text", "address-level2"],
                ["state", "State", "text", "address-level1"],
                ["pincode", "6-digit PIN code", "text", "postal-code"],
              ].map(([name, label, type, autoComplete]) => (
                <div key={name} className="min-w-0">
                  <label
                    htmlFor={name}
                    className="mb-1 block text-sm font-medium"
                  >
                    {label}
                  </label>

                  <input
                    id={name}
                    type={type}
                    autoComplete={autoComplete}
                    className="w-full min-w-0 border border-gray-300 px-4 py-3 outline-none focus:border-black"
                    {...formik.getFieldProps(name)}
                  />

                  {formik.touched[name] && formik.errors[name] && (
                    <p className="mt-1.5 break-words text-xs text-red-600">
                      {formik.errors[name]}
                    </p>
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={formik.isSubmitting}
                className="w-full bg-black py-3 font-semibold text-white hover:bg-gray-800 disabled:opacity-60"
              >
                {formik.isSubmitting ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>
            </form>

            <div className="h-fit min-w-0 bg-white p-6">
              <h2 className="mb-5 text-xl font-bold">Order Summary</h2>

              {cartItems.map((item, index) => (
                <div
                  key={item.id ?? `${item.name}-${index}`}
                  className="mb-4 flex min-w-0 justify-between gap-3 text-sm"
                >
                  <span className="min-w-0 break-words">
                    {item.name} × {item.quantity || 1}
                  </span>

                  <span className="shrink-0">
                    ₹
                    {(
                      Number(item.price) * Number(item.quantity || 1)
                    ).toFixed(2)}
                  </span>
                </div>
              ))}

              <hr className="my-4" />

              <div className="flex flex-wrap justify-between gap-2 font-bold">
                <span>Total</span>
                <span>₹{Number(cartTotal).toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
