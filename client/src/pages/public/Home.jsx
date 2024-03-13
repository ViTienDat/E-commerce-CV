import React, { useState, useEffect } from "react";
import { Loading, Product } from "../../components";
import { apiGetProducts } from "../../apis/product";
import { Link } from "react-router-dom";
import path from "../../ultils/path";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Home = () => {
  const [products, setProducts] = useState(null);
  const fetchProduct = async () => {
    const response = await apiGetProducts();
    setProducts(response?.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  window.scrollTo(0, 0);

  return (
    <div className="w-main py-[35px]">
      <div className="flex gap-[30px] flex-wrap">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {products?.map((el) => (
            <div key={el?._id}>
              <Product data={el} />
            </div>
          ))}
        </Masonry>
      </div>

      <div className="w-full flex items-center justify-center my-8">
        <Link to={`${path.PRODUCTS}/all`}>
          <span className="px-10 py-2 transition-colors duration-200 bg-main text-[14px] text-white hover:bg-main2 ">
            Xem tất cả
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
