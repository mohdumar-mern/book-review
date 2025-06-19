import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBook,
  fetchBookById,
  fetchBookByIdForDownload,
} from "../features/Books/bookSlice";
import { fetchReviewsByBook } from "../features/review/reviewSlice";
import { formatDistanceToNow } from "date-fns";
import { Helmet } from "react-helmet-async";
import Container from "../components/UI/Container";
import ReviewForm from "../components/ReviewForm";
import { Trash } from "lucide-react";
import Loader from "../components/UI/Loader";

const BookDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [visibleCount, setVisibleCount] = useState(5);

  const { selectedBook, loading, error } = useSelector((state) => state.books);
  const { token, userRole, userId } = useSelector((state) => state.auth);
  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    if (id) {
      dispatch(fetchBookById(id));
      dispatch(fetchReviewsByBook(id));
    }
  }, [dispatch, id]);

  const handleDownload = async () => {
    try {
      const blob = await dispatch(fetchBookByIdForDownload(id)).unwrap();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${selectedBook?.title || "book"}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      // console.error("Failed to download book:", err);
    }
  };

  const handleDelete = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      dispatch(deleteBook(id))
        .unwrap()
        .then(() => {
          navigate("/books");
        })
        .catch((err) => {
          // console.error("Failed to delete book:", err);
        });
    }
  }, [dispatch, id, navigate]);

  const handleShowMore = () => setVisibleCount((prev) => prev + 5);
  const handleShowLess = () => setVisibleCount((prev) => Math.max(5, prev - 5));

  if (loading) {
    return (
      <Container>
        <p className="text-center py-10"><Loader text="📚 Loading book details..." size="lg" /></p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className="text-center text-red-500 py-10"> {error}</p>
      </Container>
    );
  }

  if (!selectedBook) {
    return (
      <Container>
        <p className="text-center text-gray-500 py-10">No book found.</p>
      </Container>
    );
  }

  const { title, author, description, genre, thumbnail, book } = selectedBook;

  return (
    <Container>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{`${title} by ${author} | Book Review Platform`}</title>
        <meta name="description" content={description?.slice(0, 160)} />
        <meta property="og:title" content={`${title} - Book Review`} />
        <meta property="og:description" content={description?.slice(0, 160)} />
        <meta property="og:image" content={thumbnail?.url} />
      </Helmet>

      <div className="max-w-3xl mx-auto p-4 flex flex-col md:flex-row gap-6">
        {/* Thumbnail */}
        <div className="w-full md:w-64 flex-shrink-0">
          <img
            src={thumbnail?.url}
            alt={title}
            className="w-64 h-80 object-cover rounded shadow"
            loading="lazy"
          />
        </div>

        {/* Book Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-700 mt-1">
            By <span className="font-medium">{author}</span>
          </p>
          <p className="mt-4 text-gray-800">{description}</p>
          <p className="mt-2 text-sm text-gray-500">Genre: {genre}</p>

          <div className="flex flex-wrap gap-3 mt-5">
            {book?.url && (
              <button
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-600 p-2 rounded text-white"
              >
                📥 Download PDF
              </button>
            )}
            {token && userRole === "admin" && (
              <button
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 p-2 rounded text-white flex items-center gap-2"
              >
                <Trash size={16} />
                Delete Book
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-10 max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4">📖 User Reviews</h2>

        {!reviews || reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <>
            <div className="space-y-4">
              {reviews.slice(0, visibleCount).map((review) => (
                <div
                  key={review._id}
                  className="bg-gray-100 text-gray-800 shadow p-4 rounded"
                >
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h4 className="font-semibold">
                        {review.user?.name || "Anonymous"}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(review.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                    <span className="text-yellow-500 font-semibold text-sm">
                      {review.rating} ⭐
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>

            {/* Pagination buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handleShowLess}
                disabled={visibleCount <= 5}
                className="text-blue-600 hover:underline disabled:opacity-50"
              >
                Show Less
              </button>
              {visibleCount < reviews.length && (
                <button
                  onClick={handleShowMore}
                  className="text-blue-600 hover:underline"
                >
                  Show More
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {/* Add Review */}
      {userId && (
        <div className="max-w-3xl mx-auto px-4 pb-12">
          <ReviewForm bookId={id} />
        </div>
      )}
    </Container>
  );
};

export default BookDetailsPage;
