
import { toast } from "react-toastify";
import * as yup from "yup";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../Component/authContext";
import { useFormik } from "formik";

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const initialState = {
    email: "",
    password: "",
  };

  const [showPassword, setShowpassword] = useState(false);
  const [error, setError] = useState("");

  const destination = location.state?.from || "/checkout";

  const formik = useFormik({
    initialValues: initialState,

    validationSchema: yup.object({
      email: yup
        .string()
        .email("Please enter a valid email address")
        .required("Please enter your Email Address"),

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
    }),

    onSubmit: async (values, { setSubmitting }) => {
      setError("");

      try {
        if (!auth) {
          toast.error("Authentication is not configured.");
          return;
        }

        const result = auth.login(
          values.email.trim().toLowerCase(),
          values.password
        );

        if (result?.success) {
          toast.success("Login successful!");
          navigate(destination, { replace: true });
        } else {
          toast.error(result?.message || "Invalid email or password.");
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
          aria-label="Close login"
          className="absolute right-5 top-4 text-3xl leading-none text-gray-400 transition hover:text-black"
        >
          ×
        </Link>

        <div className="mb-9 pt-3 text-center">
          <h1 className="break-words text-3xl font-black tracking-[4px] text-black">
            MakeupMuse
          </h1>

          <h2 className="mt-7 text-2xl font-bold tracking-wide text-gray-900">
            WELCOME BACK!
          </h2>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Login to continue shopping your favourite beauty essentials.
          </p>
        </div>

        {error && (
          <p
            role="alert"
            className="mb-4 break-words rounded-lg bg-red-50 p-3 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-5">
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
              placeholder="Enter your registered email"
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
                placeholder="Enter your password"
                autoComplete="current-password"
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

          {/* Submit button */}
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full cursor-pointer rounded-lg bg-black py-4 text-base font-bold tracking-[2px] text-white transition duration-300 hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {formik.isSubmitting ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        <p className="mt-6 break-words text-center text-base text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-gray-500 underline decoration-gray underline-offset-4 transition hover:text-black"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
