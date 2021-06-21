import React, { useState, useEffect, useMemo } from "react";
import { range } from "../../helpers/array-utils";

const fetchPaginationData = (
  totalPages,
  currentPage,
  maximumNeighbours = 4
) => {
  let minBound = Math.max(1, currentPage - maximumNeighbours);
  let maxBound = Math.min(totalPages, currentPage + maximumNeighbours);
  return {
    isEnd: currentPage === totalPages,
    pages: range(minBound, maxBound),
    isStart: currentPage === 1,
  };
};

const Pagination = ({ onPageChanged, totalPages, currentPage = 0 }) => {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const { isEnd, isStart, pages } = useMemo(
    () => fetchPaginationData(totalPages, selectedPage),
    [totalPages, selectedPage]
  );

  useEffect(() => {
    onPageChanged?.call(this, selectedPage);
  }, [selectedPage]);

  return (
    <div>
      {!isStart && (
        <button onClick={() => setSelectedPage(1)}>Move to start</button>
      )}
      {pages.map((pageNumber) => (
        <button
          key={"pagination-" + pageNumber}
          onClick={() => setSelectedPage(pageNumber)}
        >
          {pageNumber}
          {selectedPage == pageNumber && "( selected )"}
        </button>
      ))}
      {!isEnd && (
        <button onClick={() => setSelectedPage(totalPages)}>Move to end</button>
      )}
    </div>
  );
};

export default Pagination;
