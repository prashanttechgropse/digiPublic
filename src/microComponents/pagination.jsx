import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";

const Pagination = (props) => {
  const { currentPage, totalItemsCount, pageSize } = props;
  const numberOfTotalPages = Math.ceil(totalItemsCount / pageSize);
  if (numberOfTotalPages === 1) return null;
  const totalPages = _.range(1, numberOfTotalPages + 1);

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link
            to="#"
            className="page-link"
            onClick={() =>
              props.onPageChange(
                currentPage === 1 ? currentPage : currentPage - 1
              )
            }
          >
            {"<"}
          </Link>
        </li>
        {totalPages.map((pageNumber) => (
          <li
            key={pageNumber}
            className={
              pageNumber === currentPage ? "page-item active" : "page-item"
            }
          >
            <Link
              to="#"
              className="page-link"
              onClick={() => props.onPageChange(pageNumber)}
            >
              {pageNumber}
            </Link>
          </li>
        ))}
        <li className="page-item">
          <Link
            to="#"
            className="page-link"
            onClick={() =>
              props.onPageChange(
                currentPage !== totalPages.length
                  ? currentPage + 1
                  : currentPage
              )
            }
          >
            {">"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
