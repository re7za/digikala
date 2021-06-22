import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { range } from "../../helpers/array-utils";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

import style from "../../assets/styles/lib/pagination/style.module.scss";

const fetchPaginationData = (
  totalPages,
  currentPage,
  maximumNeighbours = 2
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
    <ul className={style.ul}>
      {!isStart && (
        <li className={style.li} onClick={() => setSelectedPage(1)}>
          <FontAwesomeIcon icon={faAngleDoubleRight} />
        </li>
      )}
      {pages.map((pageNumber) => (
        <li
          key={"pagination-" + pageNumber}
          className={`${style.li} ${
            selectedPage === pageNumber ? style.currentLi : ""
          }`}
          onClick={() => setSelectedPage(pageNumber)}
        >
          {pageNumber}
        </li>
      ))}
      {!isEnd && (
        <li className={style.li} onClick={() => setSelectedPage(totalPages)}>
          <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </li>
      )}
    </ul>
  );
};

Pagination.propType = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
  maximumNeighbours: PropTypes.number,
};

export default Pagination;
