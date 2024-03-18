import React, { useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import path from "../../ultils/path";
import { apiGetProduct } from "../../apis/product";
import Slider from "react-slick";
import { formatMoney } from "../../ultils/helpers";
import { SelectQuantity, Loading } from "../../components";
import { Size } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { showModal } from "../../store/app/appSlice";
import { apiRemoveWislist, apiUpdateCart, apiUpdateWislist } from "../../apis";
import { colorBoard } from "../../ultils/contants";
import { TiTick } from "react-icons/ti";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { getCurrent } from "../../store/user/asyncActions";
import icons from "../../ultils/icons";

const { IoIosHeartEmpty, BsCartPlus, IoHeartDislikeOutline } = icons;

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
};

const DetailProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isActiveSize, setIsActiveSize] = useState(null);
  const [color, setColor] = useState(null);
  const [productData, setProductData] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [changeThumb, setChangeThumb] = useState(productData?.thumbnail);
  const { current } = useSelector((state) => state.user);
  const { pid, title } = useParams();
  const fetchProductData = async () => {
    const response = await apiGetProduct(pid);
    if (response) setProductData(response?.data);
    window.scrollTo(0, 0);
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

  const handleUpdateCart = async () => {
    if (!current) {
      Swal.fire({
        title: "Almost...",
        text: "Please login first!",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Cancel!",
        confirmButtonText: "Go Login",
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    }
    let err = 0;
    if (productData?.color.length > 1 && !color) {
      Swal.fire({
        title: "Missing input",
        icon: "error",
        text: "Need to enter color!",
      });
      err++;
    }
    if (productData?.size.length > 1 && !isActiveSize) {
      Swal.fire({
        title: "Missing input",
        icon: "error",
        text: "Need to enter size!",
      });
      err++;
    }
    if (err == 0) {
      const data = {};
      data.pid = productData?._id;
      data.quantity = quantity;
      if (color) {
        data.color = color;
      }
      if (isActiveSize) {
        data.size = isActiveSize;
      }
      dispatch(showModal({ isShowModal: true, modalChildren: <Loading /> }));
      const response = await apiUpdateCart(data);
      dispatch(showModal({ isShowModal: false, modalChildren: null }));
      if (response?.success) {
        toast.success("Update to cart");
        dispatch(getCurrent());
      } else {
        toast.error(response.message);
      }
    }
  };

  const handdleUpdateWislist = async (pid) => {
    if (!current) {
      Swal.fire({
        title: "Almost...",
        text: "Please login first!",
        icon: "info",
        showCancelButton: true,
        cancelButtonText: "Cancel!",
        confirmButtonText: "Go Login",
      }).then((rs) => {
        if (rs.isConfirmed) {
          navigate(`/${path.LOGIN}`);
        }
      });
    } else {
      const response = await apiUpdateWislist(pid);
      if (response?.success) {
        toast.success("Success");
        dispatch(getCurrent());
      } else {
        toast.error(response.message);
      }
    }
  };

  const handdleRemoveWislist = async (pid) => {
    const response = await apiRemoveWislist(pid);
    if (response?.success) {
      toast.success("Success");
      dispatch(getCurrent());
    } else {
      toast.error(response.message);
    }
  };

  return (
    <div className="w-full">
      <ToastContainer />
      <div className="bg-[#f5f5f5] py-[15px] flex justify-center">
        <div className="w-main flex text-[14px]">
          <Link to={`/`}>
            <h3 className="hover:text-main"> Trang chủ </h3>
          </Link>
          <span className="px-2"> / </span>
          <Link to={`/${path.PRODUCTS}/all`}>
            <h3 className="hover:text-main"> ALL ITEMS</h3>
          </Link>
          <span className="px-2"> / </span>
          <h3 className="text-main">{title.toUpperCase()}</h3>
        </div>
      </div>
      <div className="flex max-md:flex-col m-auto w-main my-[35px] gap-[30px]">
        <div className="w-[40%] max-md:w-full flex flex-col gap-4">
          <img src={changeThumb || productData?.thumbnail} alt="thumbnail" />
          {productData?.images.length > 1 && (
            <div className="w-full">
              <Slider {...settings} className="img-slider">
                {productData?.images?.map((el) => (
                  <div key={el} className="p-2">
                    <img
                      onClick={() => setChangeThumb(el)}
                      src={el}
                      alt="image product"
                      className="object-contain w-[80px] h-[80px] cursor-pointer"
                    />
                  </div>
                ))}
              </Slider>
            </div>
          )}
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
            {productData?.color?.length > 1 && (
              <div className="flex flex-col gap-4 bg-">
                <span>Màu sắc</span>
                <div className="flex gap-2">
                  {productData.color.map((el) => (
                    <span
                      key={el}
                      onClick={() => setColor(el)}
                      title={el}
                      className={`h-8 w-8 cursor-pointer flex text-white items-center justify-center border-2  ${
                        el == "white" && el == color && "bg-slate-500"
                      } ${colorBoard.find((cl) => cl.name == el)?.color}`}
                    >
                      {color == el && <TiTick size={18} />}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col my-[20px]">
            {productData?.size.length > 1 && (
              <div className="flex flex-col gap-4">
                <span>Kích thước</span>
                <div className="flex gap-3">
                  {productData.size.map((el) => (
                    <span
                      key={el}
                      onClick={() => setIsActiveSize(el)}
                      className={`w-10 h-10 flex items-center justify-center ${
                        isActiveSize === el
                          ? "bg-main text-white cursor-default"
                          : "border cursor-pointer"
                      } `}
                    >
                      {el.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="w-main pt-8 pb-4 ">
              {productData?.category.title !== "accessories" ? (
                <span
                  onClick={() =>
                    dispatch(
                      showModal({
                        isShowModal: true,
                        modalChildren: (
                          <Size category={productData?.category.title} />
                        ),
                      })
                    )
                  }
                  className="bg-main w py-2 px-5 cursor-pointer text-white hover:bg-main2"
                >
                  Bảng size
                </span>
              ) : (
                <span className="bg-gray-400 w py-2 px-5 cursor-default text-white ">
                  Bảng size
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col mb-5">
            <div className="mb-[15px]">Số lượng:</div>
            <div className="flex">
              <div className="flex h-10"></div>
              <SelectQuantity
                quantity={quantity}
                handleQuantity={handleQuantity}
                handleChangeQuantity={handleChangeQuantity}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-5">
              {productData?.isready ? (
                <button
                  onClick={() => handleUpdateCart()}
                  className="flex justify-center gap-2 items-center text-white transition-colors duration-200 bg-main py-3 w-[250px] font-semibold hover:bg-main2 text-[13px]"
                >
                  <BsCartPlus size={20} />
                  THÊM VÀO GIỎ HÀNG
                </button>
              ) : (
                <span className="flex justify-center cursor-default gap-2 items-center text-white transition-colors duration-200 bg-gray-300 py-3 w-[250px] font-semibold text-[13px]">
                  <BsCartPlus size={20} />
                  THÊM VÀO GIỎ HÀNG
                </span>
              )}
              {current?.wislist.find(
                (el) => el?.product?._id == productData?._id
              ) ? (
                <div
                  onClick={() =>
                    handdleRemoveWislist(
                      current?.wislist.find(
                        (el) => el?.product?._id == productData?._id
                      )?._id
                    )
                  }
                  className="flex gap-2 items-center text-[13px] font-semibold justify-center cursor-pointer w-[250px] bg-main hover:bg-main2 text-white transition-colors duration-200"
                >
                  <IoHeartDislikeOutline size={20} />
                  BỎ THÍCH
                </div>
              ) : (
                <div
                  onClick={() => handdleUpdateWislist(productData?._id)}
                  className="flex gap-2 items-center text-[13px] font-semibold justify-center cursor-pointer w-[250px] bg-main hover:bg-main2 text-white transition-colors duration-200"
                >
                  <IoIosHeartEmpty size={20} />
                  YÊU THÍCH
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
