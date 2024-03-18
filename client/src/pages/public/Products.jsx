import React, { useCallback, useEffect, useState } from "react";
import {
  Product,
  Sidebar,
  SortItem,
  Pagination,
  Loading,
} from "../../components";
import {
  Link,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import path from "../../ultils/path";
import { apiGetProducts } from "../../apis";
import Masonry from "react-masonry-css";
import { selectOption } from "../../ultils/contants";
import icons from "../../ultils/icons";
import { showModal } from "../../store/app/appSlice";

const { IoSearchSharp } = icons;

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const dispatch = useDispatch();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [sort, setSort] = useState("");
  const [Products, setProducts] = useState(null);
  const { category } = useParams();
  const fetchProductByCategory = async (queries) => {
    dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
    const response = await apiGetProducts({ ...queries, category });
    dispatch(showModal({ isShowModal: false, modalChildren: null }));
    if (response.success) setProducts(response);
    window.scrollTo(0, 0);
  };

  const changeValue = useCallback(
    (value) => {
      setSort(value);
    },
    [sort]
  );

  useEffect(() => {
    const queries = {};
    for (let i of params) queries[i[0]] = i[1];
    fetchProductByCategory(queries);
  }, [params, category]);

  useEffect(() => {
    if (sort) {
      navigate({
        pathname: `/product/${category}`,
        search: createSearchParams({ sort }).toString(),
      });
    }
  }, [sort]);

  return (
    <div className="flex flex-col w-full gap-8">
      <div className="text-[14px] bg-[#f5f5f5] py-[15px]">
        <div className="w-main m-auto">
          <Link to={`/`}>
            <span className="hover:text-main">Trang chủ </span>
          </Link>
          / <span className="text-main">{category}</span>
        </div>
      </div>
      <div className="flex w-main m-auto">
        <div className="w-1/4">
          <Sidebar />
        </div>
        <div className="w-3/4">
          <div className="flex justify-between gap-4 mx-0 mt-[15px] mb-[30px] border-b pb-[15px]">
            <span className="text-[18px] font-bold">Tất cả sản phẩm</span>
            <div className="flex items-center gap-3">
              <span className="text-[14px]">Sắp xếp: </span>
              <SortItem
                value={sort}
                changeValue={changeValue}
                options={selectOption}
              />
            </div>
          </div>
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {Products?.data?.map((el) => (
              <Product data={el} key={el._id} />
            ))}
          </Masonry>
          <div className=" w-main m-auto my-4 flex justify-end">
            <Pagination totalCount={Products?.counts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
