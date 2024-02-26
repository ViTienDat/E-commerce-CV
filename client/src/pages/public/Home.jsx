import React, { useState, useEffect } from "react";
import { Product } from "../../components";
import { apiGetProducts } from "../../apis/product";
import { Link } from "react-router-dom";
import path from "../../ultils/path";

const Home = () => {
  const [products, setProducts] = useState(null);
  const fetchProduct = async () => {
    const response = await apiGetProducts();
    setProducts(response?.data);
  };
  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="w-main py-[35px]">
      <div className="flex gap-[30px] flex-wrap">
        {products?.map((el) => (
          <div className="flex-1" key={el?._id}>
            <Product data={el} />
          </div>
        ))}
      </div>

      <div className="w-full flex items-center justify-center my-8">
        <Link to={path.PRODUCTS}>
          <span className="px-10 py-2 bg-main text-[14px] text-white hover:bg-main2 ">
            Xem tất cả
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
