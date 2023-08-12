import React from "react";
import { AllJobValues } from "../pages/AllJob";
import { useLocation, useNavigate } from "react-router-dom";

const PageContainer = () => {
  const {
    data: { totalPages, currentPage },
  } = AllJobValues();

  const pages = Array.from({ length: totalPages }, (_, index) => {
    return index + 1;
  });

  const { search, pathname } = useLocation();
  // console.log(search, pathname);
  const navigate = useNavigate();

  const handelPageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    console.log(searchParams);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  return (
    <section>
      <button
        onClick={() => {
          if (currentPage === 1) {
            handelPageChange(totalPages);
            return;
          }
          handelPageChange(currentPage - 1);
        }}
      >
        Prev
      </button>
      {pages.map((page) => {
        return (
          <button
            key={page}
            style={{ color: currentPage === page ? "#e40606" : "#333" }}
            onClick={() => handelPageChange(page)}
          >
            {page}
          </button>
        );
      })}
      <button
        onClick={() => {
          if (currentPage === totalPages) {
            handelPageChange(1);
            return;
          }
          handelPageChange(currentPage + 1);
        }}
      >
        Next
      </button>
    </section>
  );
};

export default PageContainer;
