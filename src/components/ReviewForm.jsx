import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  submitReview,
  resetReviewStatus,
} from "../features/review/reviewSlice";
import { useEffect } from "react";

const ReviewForm = ({ bookId }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.review);

  const onSubmit = (data) => {
    const payload = {
      book: bookId,
      rating: Number(data.rating),
      comment: data.comment,
    };
    dispatch(submitReview(payload));
  };

  useEffect(() => {
    if (success) {
      reset();
      const timeout = setTimeout(() => {
        dispatch(resetReviewStatus());
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [success, dispatch, reset]);

  return (
    <section className="mt-10 border-t pt-6">
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Leave a Review
      </h3>

      {error && <p className="text-red-600 text-sm mb-3">❌ {error}</p>}
      {success && (
        <p className="text-green-600 text-sm mb-3">
          ✅ Review submitted successfully!
        </p>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        aria-label="Book review form"
      >
        {/* Rating */}
        <div>
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rating
          </label>
          <select
            id="rating"
            {...register("rating", { required: "Rating is required" })}
            className="w-full border border-gray-300 rounded px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="">Select Rating</option>
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">
              {errors.rating.message}
            </p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Comment
          </label>
          <textarea
            id="comment"
            {...register("comment", { required: "Comment is required" })}
            rows="4"
            placeholder="Write your thoughts about this book..."
            className="w-full border border-gray-300 rounded px-3 py-2 resize-none text-gray-700 focus:outline-none focus:ring focus:ring-blue-300"
          />
          {errors.comment && (
            <p className="text-red-500 text-sm mt-1">
              {errors.comment.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded shadow-sm disabled:opacity-60 focus:outline-none focus:ring focus:ring-blue-300"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </section>
  );
};

export default ReviewForm;
