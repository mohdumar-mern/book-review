import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/UI/Container";
import BookCard from "../components/UI/BookCard";
import { fetchBooks } from "../features/Books/bookSlice";
import Pagination from "../components/UI/Pagination";
import { Helmet } from "react-helmet-async";
import Loader from "../components/UI/Loader";

const Home = () => {
  const dispatch = useDispatch();
  const { books, pagination, loading, error } = useSelector((state) => state.books);

  // ✅ Memoized query to prevent unnecessary dispatches
  const query = useMemo(() => ({
    page: pagination?.currentPage || 1,
    limit: 6,
    featured: true,
  }), [pagination?.currentPage]);

  useEffect(() => {
    dispatch(fetchBooks(query));
  }, [dispatch, query]);

  // ✅ Handle page change
  const handlePageChange = (page) => {
    dispatch(fetchBooks({ ...query, page }));
  };

  return (
    <Container>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Featured Books | BookReview</title>
        <meta name="description" content="Discover top-rated featured books, hand-picked by our editors. Read reviews and download PDFs instantly." />
      </Helmet>

      <div className="py-10">
        <h2 className="text-3xl font-bold mb-6 text-center">📚 Featured Books</h2>

        {error && <p className="text-center text-red-500">{error}</p>}

        {loading ? (
          <p className="text-center"><Loader text="Loading featured books..." size="lg" /></p>
        ) : (
          <>
            {books.length === 0 ? (
              <p className="text-center text-gray-500">No featured books available.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>
            )}

            {/* ✅ Show pagination only when multiple pages exist */}
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

export default Home;
