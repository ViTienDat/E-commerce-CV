import React from "react";
import usePagination from "../hooks/usePagination";
import PagiItem from "./PagiItem";

const Pagination = ({ totalCount }) => {
  const panigation = usePagination(totalCount, 2);
  return (
    <div className="flex">
      {panigation?.map((el) => (
        <PagiItem key={el}>{el}</PagiItem>
      ))}
    </div>
  );
};

export default Pagination;
