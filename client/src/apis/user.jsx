import axios from "../axios";

export const apiRegister = (data) =>
  axios({
    url: "/user/register",
    method: "post",
    data,
  });

export const apiLogin = (data) =>
  axios({
    url: "/user/login",
    method: "post",
    data,
  });

export const apiGetCurrent = () =>
  axios({
    url: "/user/getcurrent",
    method: "get",
  });

export const apiGetUsers = (params) =>
  axios({
    url: "/user/getall",
    method: "get",
    params,
  });

export const apiUpdateUser = (data, uid) =>
  axios({
    url: "/user/" + uid,
    method: "put",
    data,
  });

export const apiDeleteUser = (uid) =>
  axios({
    url: "/user/" + uid,
    method: "delete",
  });
