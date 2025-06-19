import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import FormInput from "../components/UI/Input";
import { register as registerUser } from "../features/auth/auth";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/profile");
    } catch (error) {
      setApiError(error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-md rounded text-black">
      <Helmet>
        <title>Sign Up | BookVerse</title>
        <meta
          name="description"
          content="Create your free BookVerse account to start exploring and reviewing books."
        />
      </Helmet>

      <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>

      {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <FormInput
          label="Full Name"
          type="text"
          name="name"
          placeholder="John Doe"
          register={register}
          rules={{
            required: "Name is required",
            minLength: { value: 2, message: "Name must be at least 2 characters" },
          }}
          error={errors.name}
        />

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 hover:underline font-medium"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
