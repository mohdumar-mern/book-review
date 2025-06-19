// src/pages/UpdateProfile.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import FormInput from "../components/UI/Input";
import { updateUserProfile } from "../features/auth/auth";

const UpdateProfile = () => {
  const { userName, userEmail, userId } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("name", userName);
    setValue("email", userEmail);
  }, [userName, userEmail, setValue]);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");
    setApiSuccess("");

    try {
      await dispatch(updateUserProfile({ id: userId, formData: data })).unwrap();
      setApiSuccess("Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (error) {
      setApiError(error || "Update failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 shadow rounded text-black">
      <Helmet>
        <title>Update Profile | BookVerse</title>
        <meta
          name="description"
          content="Edit your personal information and update your BookVerse profile details."
        />
      </Helmet>

      <h2 className="text-2xl font-bold mb-6 text-center">Update Profile</h2>

      {apiError && <p className="text-red-500 text-sm mb-4">{apiError}</p>}
      {apiSuccess && <p className="text-green-600 text-sm mb-4">{apiSuccess}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Full Name"
          name="name"
          placeholder="Your name"
          register={register}
          rules={{ required: "Name is required" }}
          error={errors.name}
        />
        <FormInput
          label="Email"
          name="email"
          type="email"
          placeholder="Your email"
          register={register}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Invalid email format",
            },
          }}
          error={errors.email}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-4 px-4 py-2 rounded text-white transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
