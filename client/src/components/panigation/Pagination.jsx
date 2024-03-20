import React from "react";
import usePagination from "../../hooks/usePagination";
import PagiItem from "./PagiItem";
import { useSearchParams } from "react-router-dom";

const Pagination = ({ totalCount }) => {
  const [params] = useSearchParams();
  const panigation = usePagination(totalCount, params.get("page") || 1);
  return (
    <div className="flex">
      {panigation?.map((el) => (
        <PagiItem key={el}>{el}</PagiItem>
      ))}
    </div>
  );
};

export default Pagination;
