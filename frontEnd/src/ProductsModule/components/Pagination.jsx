import React from "react";
import "./Pagination.css";
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </button>

      {pageNumbers.map((number) => {
        // Logic to show only a limited number of page buttons
        if (
          number === 1 ||
          number === totalPages ||
          (number >= currentPage - 2 && number <= currentPage + 2)
        ) {
          return (
            <button
              key={number}
              className={`pagination-btn ${
                currentPage === number ? "active" : ""
              }`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </button>
          );
        }
        if (number === currentPage - 3 || number === currentPage + 3) {
          return (
            <span key={number} className="pagination-ellipsis">
              ...
            </span>
          );
        }
        return null;
      })}

      <button
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
