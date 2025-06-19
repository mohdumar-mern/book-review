import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../features/Books/bookSlice";
import BookCard from "../components/UI/BookCard";
import Container from "../components/UI/Container";
import Pagination from "../components/UI/Pagination";
import { Helmet } from "react-helmet-async";
import Loader from "../components/UI/Loader";

const BookListPage = () => {
  const dispatch = useDispatch();
  const { books, pagination, loading, error } = useSelector(
    (state) => state.books
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  // ✅ Debounce logic (waits 500ms after typing stops)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Adjust time as needed

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // ✅ Memoized query object
  const query = useMemo(() => {
    return {
      page: pagination?.currentPage || 1,
      limit: 6,
      search: debouncedSearchTerm,
    };
  }, [pagination?.currentPage, debouncedSearchTerm]);

  useEffect(() => {
    dispatch(fetchBooks(query));
  }, [dispatch, query]);

  const handlePageChange = (page) => {
    dispatch(fetchBooks({ ...query, page }));
  };

  return (
    <Container>
      <Helmet>
        <title>All Books | BookReview</title>
        <meta
          name="description"
          content="Search and browse all available books in real-time. Filter by title or author name instantly."
        />
      </Helmet>

      <div className="py-10">
        <h1 className="text-2xl text-center font-bold mb-6">📚 All Books</h1>

        {/* 🔍 Real-Time Search Input */}
        <div className="mb-6 flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search by title or author..."
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-md"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        {loading ? (
          <p className="text-center"><Loader text="Loading List books..." size="lg" /></p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {books?.length > 0 &&
                books.map((book) => <BookCard key={book._id} book={book} />)}
            </div>

            {pagination?.totalPages > 1 && (
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default BookListPage;
