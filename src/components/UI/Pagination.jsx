import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisible = 5;
  const start = Math.max(1, currentPage - 2);
  const end = Math.min(totalPages, start + maxVisible - 1);

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="mt-8 flex justify-center items-center space-x-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="btn join-item"
      >
        Prev
      </button>

      {start > 1 && (
        <>
          <button
            className="btn join-item"
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {start > 2 && <span className="btn btn-disabled join-item">...</span>}
        </>
      )}

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn join-item ${
            page === currentPage
              ? "bg-blue-500 text-white border-blue-500 hover:bg-blue-600"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      {end < totalPages && (
        <>
          {end < totalPages - 1 && (
            <span className="btn btn-disabled join-item">...</span>
          )}
          <button
            className="btn join-item"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="btn join-item"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
