import React from "react";
import {
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";

const PagiItem = ({ children }) => {
  const [params] = useSearchParams();
  const { category } = useParams();
  console.log();
  const navigate = useNavigate();
  const handlePanigation = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(children)) queries.page = children;
    navigate({
      pathname: `/product/${category}`,
      search: createSearchParams(queries).toString(),
    });
  };
  return (
    <button
      onClick={handlePanigation}
      className={`w-10 h-10 flex items-center justify-center border ${
        ((Number(children) && "hover:text-main",
        Number(params.get("page")) === children && "bg-main text-white"),
        !Number(params.get("page")) && children === 1 && "bg-main text-white")
      }`}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default PagiItem;
