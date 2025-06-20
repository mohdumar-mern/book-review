import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookByIdForDownload } from "../../features/Books/bookSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const handleDownload = async () => {
    try {
      const blob = await dispatch(fetchBookByIdForDownload(book._id)).unwrap();
      const url = window.URL.createObjectURL(blob);

      // ✅ Open PDF in new tab
      window.open(url, "_blank", "noopener,noreferrer");

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 500);
    } catch (error) {
      console.error("Failed to open book:", error);
    }
  };

  return (
    <article className=" p-4 rounded-xl shadow-sm hover:shadow-md bg-white transition">
      <button
        onClick={handleDownload}
        className="w-full flex justify-center"
        aria-label={`Download ${book.title}`}
      >
        <img
          src={book.thumbnail?.url}
          alt={book.title || "Book cover"}
          loading="lazy"
          className="w-48 h-64 object-cover  rounded-xl border transition-transform duration-300 hover:scale-105"
        />
      </button>

      <h3 className="text-lg font-semibold mt-3 mb-1 text-center line-clamp-2">
        {book.title || "Untitled"}
      </h3>

      <p className="text-gray-500 text-sm text-center mb-4 line-clamp-1">
        {book.author || "Unknown Author"}
      </p>

      <div className="flex justify-center gap-3">
        <Link
          to={`/books/${book._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md"
          aria-label={`View details of ${book.title}`}
        >
          Details
        </Link>

        {token && book?.book?.url && (
          <button
            onClick={handleDownload}
            className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-2 rounded-md"
            aria-label={`Download ${book.title}`}
          >
            View PDF
          </button>
        )}
      </div>
    </article>
  );
};

export default BookCard;
