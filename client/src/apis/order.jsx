import axios from "../axios";

export const apiCreateOrder = (data) =>
  axios({
    url: "/order/",
    method: "post",
    data,
  });

export const apiGetOrderUser = () =>
  axios({
    url: "/order/",
    method: "get",
  });

export const apiGetAllOrder = (params) =>
  axios({
    url: "/order/all",
    method: "get",
    params,
  });

export const apiUpdateStatus = (data, oid) =>
  axios({
    url: "/order/status/" + oid,
    method: "put",
    data,
  });
