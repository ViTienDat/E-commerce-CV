import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import path from "../../ultils/path";
import { apiGetProduct } from "../../apis/product";
import Slider from "react-slick";
import { formatMoney } from "../../ultils/helpers";
import { SelectQuantity } from "../../components";
import teesize from "../../assets/tee-size.webp";
import jacketsize from "../../assets/jacket-size.webp";
import hoodiesize from "../../assets/hoodie-size.webp";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

const DetailProduct = () => {
  const [isActive, setIsActive] = useState("S");
  const [showImgSize, setShowImgSize] = useState(false);
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { pid, title } = useParams();
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response) setProductData(response?.data);
  };
  useEffect(() => {
    if (pid) fetchProductData();
  }, [pid]);

  const handleQuantity = useCallback(
    (number) => {
      if (!Number(number) || Number(number) < 1) {
        return;
      } else setQuantity(number);
    },
    [quantity]
  );

  const handleChangeQuantity = useCallback(
    (flag) => {
      if (flag === "minus" && quantity === 1) return;
      if (flag === "minus") {
        setQuantity((prev) => +prev - 1);
      } else {
        setQuantity((prev) => +prev + 1);
      }
    },
    [quantity]
  );

  return (
    <div className="w-full">
      <div className="bg-[#f5f5f5] py-[15px] flex justify-center">
        <div className="w-main flex text-[14px]">
          <Link to={path.HOME}>
            <h3 className="hover:text-main"> Trang chủ </h3>
          </Link>
          <span className="px-2"> / </span>
          <Link to={path.PRODUCTS}>
            <h3 className="hover:text-main"> ALL ITEMS</h3>
          </Link>
          <span className="px-2"> / </span>
          <h3 className="text-main">{title.toUpperCase()}</h3>
        </div>
      </div>
      <div className="flex m-auto w-main my-[35px] gap-[30px]">
        <div className="w-[40%] flex flex-col gap-4">
          {/* <div className="image-magnify w">
            <SideBySideMagnifier
              imageSrc={productData?.thumbnail}
              imageAlt="Main Image"
              largeImageSrc={productData?.thumbnail} // Optional
              alwaysInPlace={false}
              inPlaceMinBreakpoint={true}
            />
          </div> */}
          <img src={productData?.thumbnail} alt="thumbnail" />
          <div className="w-full">
            <Slider {...settings} className="img-slider">
              {productData?.images?.map((el) => (
                <div key={el} className="p-2">
                  <img
                    src={el}
                    alt="image product"
                    className="object-contain w-[80px] h-[80px] "
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-[60%] text-[14px]">
          <h1 className="text-[30px] mb-[10px]">
            {productData?.title.toUpperCase()}
          </h1>
          <div className="mb-[10px]">
            Thương hiệu: <span className="text-main">NEEDS OF WISDOM®</span> |
            Tình trạng:{" "}
            <span className="text-main">
              {productData?.isready ? "Còn hàng" : "Hết hàng"}
            </span>
          </div>
          <div className="text-[30px] font-semibold py-3">
            <span>{productData && formatMoney(productData?.price)}</span>
          </div>
          <div>
            <span>{productData?.description}</span>
          </div>
          <div className="flex flex-col my-[20px]">
            <span>Kích thước</span>
            <div className="flex gap-3">
              <button
                className={`border h-10 w-10 ${isActive === "S" && "bg-main"}`}
                onClick={() => setIsActive("S")}
              >
                S
              </button>
              <button
                className={`border h-10 w-10 ${isActive === "M" && "bg-main"}`}
                onClick={() => setIsActive("M")}
              >
                M
              </button>
              <button
                className={`border h-10 w-10 ${isActive === "L" && "bg-main"}`}
                onClick={() => setIsActive("L")}
              >
                L
              </button>
              <button
                className={`border h-10 w-10 ${isActive === "XL" && "bg-main"}`}
                onClick={() => setIsActive("XL")}
              >
                XL
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-[15px]">Số lượng:</div>
            <div className="flex">
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
              <button className="text-white bg-main py-3 px-8 mx-5 font-semibold hover:bg-main2 text-[13px]">
                THÊM VÀO GIỎ HÀNG
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="mb-2">
        <div className="w-main m-auto">
          <span
            onClick={() => setShowImgSize(!showImgSize)}
            className="bg-main w py-2 px-5 cursor-pointer text-white hover:bg-main2"
          >
            Bảng size
          </span>
        </div>
        {showImgSize && (
          <div className="my-10">
            {productData?.category.title === "tee" && (
              <img src={teesize} alt="img-size" className="w-main m-auto" />
            )}
            {productData?.category.title === "jacket" && (
              <img src={jacketsize} alt="img-size" className="w-main m-auto" />
            )}
            {productData?.category.title === "hoodie" && (
              <img src={hoodiesize} alt="img-size" className="w-main m-auto" />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailProduct;
