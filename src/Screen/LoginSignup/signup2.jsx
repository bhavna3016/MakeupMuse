
import * as yup from "yup";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAuth } from "../../Component/authcontext";

export const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowpassword] = useState(false);
  const [showConfirmPassword, setConfirmPassword] = useState(false);

  const formik = useFormik({
    initialValues: initialState,

    validationSchema: yup.object({
      email: yup
        .string()
        .required("Please enter your Email Address")
        .matches(
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "Please enter a valid email"
        ),

      password: yup
        .string()
        .required("Please enter your Password")
        .min(8, "Password must be at least 8 characters")
        .max(15, "Password must be at most 15 characters")
        .matches(/[a-z]/, "Must contain at least one lowercase letter")
        .matches(/[A-Z]/, "Must contain at least one uppercase letter")
        .matches(/\d/, "Must contain at least one number")
        .matches(
          /[@.#$!%*?&]/,
          "Must contain at least one special character (@.#$!%*?&)"
        ),

      name: yup
        .string()
        .required("Please enter your name")
        .min(3, "Name must be at least 3 characters")
        .max(10, "Name must be at most 10 characters")
        .matches(
          /^[a-zA-Z][a-zA-Z\s]*$/,
          "Name can only contain letters"
        ),

      confirmPassword: yup
        .string()
        .required("Please confirm your password")
        .oneOf([yup.ref("password")], "Password must match"),
    }),

    onSubmit: (values, { setSubmitting }) => {
      try {
        const result = signup(
          values.name,
          values.email,
          values.password
        );

        if (result.success) {
          toast.success("Account created successfully!");

          setTimeout(() => {
            navigate("/login", {
              state: { signupSuccess: true },
            });
          }, 1500);
        } else {
          toast.error(result.message);
        }
      } catch {
        toast.error("Something went wrong. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="relative my-auto w-full min-w-0 max-w-md rounded-2xl border border-pink-100 bg-white p-6 shadow-2xl sm:p-10">

        {/* Close button */}
        <Link
          to="/"
          aria-label="Close signup"
          className="absolute right-5 top-4 text-3xl leading-none text-gray-400 transition hover:text-black"
        >
          ×
        </Link>

        <div className="mb-5 text-center">
          <h1 className="break-words text-3xl font-black tracking-widest text-black">
            MakeupMuse
          </h1>

          <h2 className="mt-4 text-xl font-bold">CREATE ACCOUNT</h2>

          <p className="mt-2 text-base text-gray-500">
            Join MakeupMuse.
          </p>
        </div>

        {/* Signup form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="min-w-0">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your Name"
              autoComplete="name"
              className="w-full min-w-0 rounded-lg border border-gray-400 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#c23b68] focus:ring-2 focus:ring-pink-100"
              {...formik.getFieldProps("name")}
            />

            {formik.touched.name && formik.errors.name && (
              <p className="mt-1.5 break-words text-xs text-red-600">
                {formik.errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="min-w-0">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              autoComplete="email"
              className="w-full min-w-0 rounded-lg border border-gray-400 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#c23b68] focus:ring-2 focus:ring-pink-100"
              {...formik.getFieldProps("email")}
            />

            {formik.touched.email && formik.errors.email && (
              <p className="mt-1.5 break-words text-xs text-red-600">
                {formik.errors.email}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="min-w-0">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Password
            </label>

            <div className="relative min-w-0">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 8 Characters"
                autoComplete="new-password"
                className="w-full min-w-0 rounded-lg border border-gray-400 px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#c23b68] focus:ring-2 focus:ring-pink-100"
                {...formik.getFieldProps("password")}
              />

              <button
                type="button"
                onClick={() => setShowpassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 transition hover:text-black"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {formik.touched.password && formik.errors.password && (
              <p className="mt-1.5 break-words text-xs text-red-600">
                {formik.errors.password}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="min-w-0">
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-gray-800"
            >
              Confirm Password
            </label>

            <div className="relative min-w-0">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
                autoComplete="new-password"
                className="w-full min-w-0 rounded-lg border border-gray-400 px-4 py-3.5 pr-20 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#c23b68] focus:ring-2 focus:ring-pink-100"
                {...formik.getFieldProps("confirmPassword")}
              />

              <button
                type="button"
                onClick={() =>
                  setConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500 transition hover:text-black"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>

            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="mt-1.5 break-words text-xs text-red-600">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full cursor-pointer rounded-lg bg-black py-4 text-base font-bold tracking-[2px] text-white transition duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formik.isSubmitting ? "SIGNING UP..." : "Signup"}
          </button>
        </form>

        <p className="mt-6 break-words text-center text-base text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-black underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
