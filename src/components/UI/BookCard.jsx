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

      const a = document.createElement("a");
      a.href = url;
      a.download = `${book.title || "book"}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // console.error("Failed to download book:", error);
    }
  };

  return (
    <article className="border p-4 rounded shadow hover:shadow-md bg-gray-100 transition">
      <img
        src={book.thumbnail?.url}
        alt={book.title || "Book cover"}
        loading="lazy"
        className="w-48 mx-auto h-64 object-cover p-2 rounded-2xl transition-transform duration-300 hover:scale-105"
      />

      <h3 className="text-xl font-semibold mt-3 mb-1 text-center line-clamp-2">
        {book.title || "Untitled"}
      </h3>

      <p className="text-gray-600 text-sm text-center mb-4 line-clamp-1">
        {book.author || "Unknown Author"}
      </p>

      <div className="flex justify-center gap-3">
        <Link
          to={`/books/${book._id}`}
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
          aria-label={`View details of ${book.title}`}
        >
          View Details
        </Link>

        {( token && book?.book?.url) &&  (
          <button
            onClick={handleDownload}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded"
            aria-label={`Download ${book.title}`}
          >
            Download
          </button>
        )}
      </div>
    </article>
  );
};

export default BookCard;
