import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";

import FormInput from "../components/UI/Input";
import { login } from "../features/auth/auth";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      const result = await dispatch(login(data)).unwrap();

      // Store token based on Remember Me selection
      const token = result?.token;
      if (token) {
        rememberMe
          ? localStorage.setItem("token", token)
          : sessionStorage.setItem("token", token);
      }

      navigate("/profile");
    } catch (error) {
      setApiError(error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow rounded text-black">
      <Helmet>
        <title>Login | BookVerse</title>
        <meta
          name="description"
          content="Login to your BookVerse account to access your profile, reviews, and book downloads."
        />
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>

      {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          register={register}
          rules={{
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email format",
            },
          }}
          error={errors.email}
        />

        <FormInput
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          register={register}
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
          error={errors.password}
        />

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 border-gray-300"
          />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-blue-600 hover:underline font-medium">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default Login;
