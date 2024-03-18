import React, { memo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import path from "../ultils/path";
import { formatMoney } from "../ultils/helpers";
import { SelectOption } from "./";
import { apiRemoveWislist, apiUpdateWislist } from "../apis";
import { useDispatch, useSelector } from "react-redux";
import { getCurrent } from "../store/user/asyncActions";
import Swal from "sweetalert2";

const Product = ({ data }) => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.user);
  const [isShowOption, setIsShowOption] = useState(false);
  const handleHover = () => {
    setIsShowOption(true);
  };
  const handleLeave = () => {
    setIsShowOption(false);
  };
  const handleRomeveWislist = async (pid) => {
    const response = await apiRemoveWislist(pid);
    if (response?.success) {
      dispatch(getCurrent());
    }
  };

  const handleAddWislist = async (pid) => {
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
        dispatch(getCurrent());
      }
    }
  };

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-7">
      <div
        className="relative"
        onMouseEnter={handleHover}
        onMouseLeave={handleLeave}
      >
        {isShowOption && (
          <div
            className={`ac absolute left-0 right-0 bottom-[45%] flex justify-center gap-1 scale-up-center
              } `}
          >
            <span
              onClick={() =>
                navigate(`/${path.DETAIL_PRODUCT}/${data._id}/${data.slug}`)
              }
            >
              <SelectOption title={"Chi tiết"} />
            </span>
            {current?.wislist.find((el) => el?.product._id == data?._id) ? (
              <span
                onClick={() =>
                  handleRomeveWislist(
                    current?.wislist.find((el) => el?.product?._id == data?._id)
                      ?._id
                  )
                }
              >
                <SelectOption title={"Bỏ thích"} />
              </span>
            ) : (
              <span onClick={() => handleAddWislist(data?._id)}>
                <SelectOption title={"Yêu thích"} />
              </span>
            )}
          </div>
        )}
        <img
          onClick={() =>
            navigate(`/${path.DETAIL_PRODUCT}/${data._id}/${data.slug}`)
          }
          src={data.thumbnail}
          alt="thumbnail"
          className="cursor-pointer object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <span className="line-clamp-1 cursor-pointer hover:text-main">
          <Link to={`${path.DETAIL_PRODUCT}/${data._id}/${data.slug}`}>
            {data.title.toUpperCase()}
          </Link>
        </span>
        <span className="line-clamp-1 font-bold">
          {formatMoney(data?.price)}
        </span>
      </div>
    </div>
  );
};

export default memo(Product);
