import React, { useEffect, useState } from "react";
import { apiGetProducts } from "../../apis/product";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import Masonry from "react-masonry-css";
import { Loading, Pagination, Product } from "../../components";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/app/appSlice";

const breakpointColumnsObj = {
  default: 4,
  1100: 4,
  700: 3,
  500: 2,
};

const SearchProduct = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const [products, setProducts] = useState(null);
  const fetchSearchProducts = async (params) => {
    dispatch(showModal({ isShowModal: true, modalChildren: "loading" }));
    const response = await apiGetProducts(params);
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response?.success) {
      setProducts(response);
    }
  };

  useEffect(() => {
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];
    if (queries) {
      fetchSearchProducts(queries);
    }
  }, [params]);
  return (
    <div className="flex flex-col w-full gap-8">
      <div className="text-[14px] bg-[#f5f5f5] py-[15px]">
        <div className="w-main m-auto">
          <Link to={`/`}>
            <span className="hover:text-main">Trang chủ </span>
          </Link>
          / <span className="text-main">search</span>
        </div>
      </div>
      <div className="flex w-main m-auto">
        <div className="w-full">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {products?.data?.map((el) => (
              <Product data={el} key={el._id} />
            ))}
          </Masonry>
          <div className=" w-main m-auto my-4 flex justify-end">
            <Pagination totalCount={products?.counts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
