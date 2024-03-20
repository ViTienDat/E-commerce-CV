import React from "react";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
  useLocation,
} from "react-router-dom";

const PagiItem = ({ children }) => {
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const handlePanigation = () => {
    const queries = Object.fromEntries([...params]);
    if (Number(children)) queries.page = children;
    navigate({
      pathname: location.pathname,
      search: createSearchParams(queries).toString(),
    });
  };

  return (
    <button
      onClick={handlePanigation}
      className={`w-10 h-10 flex items-center justify-center border ${
        Number(children) && "hover:text-main"
      } ${+params.get("page") === +children && "bg-main text-white"}
        ${!Number(params.get("page")) && children === 1 && "bg-main text-white"}
      `}
      type="button"
      disabled={!Number(children)}
    >
      {children}
    </button>
  );
};

export default PagiItem;
