import { useForm } from "react-hook-form";
import {  useDispatch } from "react-redux";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import FormInput from "../components/UI/Input";
import { addBooks } from "../features/Books/bookSlice";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("description", data.description);
    formData.append("genre", data.genre);
    formData.append("featured", data.featured);
    formData.append("thumbnail", data.thumbnail[0]);
    formData.append("book", data.book[0]);

    try {
      await dispatch(addBooks(formData)).unwrap();
      setMessage("✅ Book uploaded successfully!");
      reset();
      navigate("/")
    } catch (error) {
      setMessage(error?.message || "❌ Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 mt-12 rounded-xl bg-white text-black">
      <Helmet>
        <title>Add New Book | BookVerse</title>
        <meta
          name="description"
          content="Add a new book with a thumbnail, PDF, and details to BookVerse."
        />
      </Helmet>

      <h2 className="text-xl font-bold mb-4">📘 Upload New Book</h2>

      {message && (
        <p
          className={`mb-4 text-sm ${
            message.startsWith("✅") ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          type="text"
          name="title"
          placeholder="Book Title"
          register={register}
          rules={{ required: "Title is required" }}
          error={errors.title}
        />

        <FormInput
          type="text"
          name="author"
          placeholder="Author Name"
          register={register}
          rules={{ required: "Author is required" }}
          error={errors.author}
        />

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            {...register("description")}
            placeholder="Write a short description..."
            className='w-full px-3 py-2 border rounded focus:outline-none focus:none border-gray-300'

            rows={4}
          />
        </div>

        <FormInput
          type="text"
          name="genre"
          placeholder="Genre"
          register={register}
          rules={{ required: "Genre is required" }}
          error={errors.genre}
        />

        <div>
          <select {...register("featured")}
            className='w-full px-3 py-2 border rounded focus:outline-none focus:none border-gray-300'
            >
            <option value="">Select Featured Status</option>
            <option value="false">Not Featured</option>
            <option value="true">Featured</option>
          </select>
        </div>

        {/* Thumbnail Upload */}
        <div>
          <label className="block text-sm font-medium">Thumbnail (Image)</label>
          <input
            type="file"
            accept="image/*"
            {...register("thumbnail", { required: "Thumbnail is required" })}
            className='w-full px-3 py-2 border rounded focus:outline-none focus:none border-gray-300'

          />
          {errors.thumbnail && (
            <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
          )}
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-sm font-medium">Book File (PDF)</label>
          <input
            type="file"
            accept="application/pdf"
            {...register("book", { required: "PDF is required" })}
            className='w-full px-3 py-2 border rounded focus:outline-none focus:none border-gray-300'
          />
          {errors.book && <p className="text-red-500 text-sm">{errors.book.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
