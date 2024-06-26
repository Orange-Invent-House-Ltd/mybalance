import React from "react";
import arrowIcon from "../../assets/Icons/arrow.svg";
const Pagination = ({ pageCount, initialPage, onPageChange }: any) => {
  // where pageCount is the totalPage and initialPage is the currentPage
    const handlePrevClick = () => {
      if (initialPage > 1) {
        onPageChange(initialPage - 1);
      }
    };

    const handleNextClick = () => {
      if (initialPage < pageCount) {
        onPageChange(initialPage + 1);
      }
    };

  return (
    <div className="py-3 border-t border-[#D0D5DD] mt-3 flex  justify-between items-center px-4rounded">
      <button
        onClick={handlePrevClick}
        className="p-2 border border-[#D0D5DD] rounded-lg"
      >
        <img src={arrowIcon} className="rotate-180" alt="" />
      </button>
      <p className=" text-[#4F4F4F] font-medium">
        Page {initialPage} of {pageCount}
      </p>
      <button
        onClick={handleNextClick}
        className="p-2 border border-[#D0D5DD] rounded-lg"
      >
        <img src={arrowIcon} alt="" />
      </button>
    </div>
  );
};

export default Pagination;
