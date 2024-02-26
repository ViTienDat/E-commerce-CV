import path from "./path";

export const navigations = [
  {
    id: 1,
    value: "HOME",
    path: `${path.HOME}`,
  },
  {
    id: 2,
    value: "PRODUCTS",
    path: `${path.PRODUCTS}/all`,
  },
  {
    id: 3,
    value: "CONTACT",
    path: `${path.CONTACT}`,
  },
];

export const selectOption = [
  {
    id: 1,
    value: "",
    text: "Mặc định",
  },
  {
    id: 2,
    value: "-title",
    text: "A-Z",
  },
  {
    id: 3,
    value: "title",
    text: "Z-A",
  },
  {
    id: 4,
    value: "-price",
    text: "Giá giảm dần",
  },
  {
    id: 5,
    value: "price",
    text: "giá tăng dần",
  },
  {
    id: 1,
    value: "-createdAt",
    text: "Hàng mới nhất",
  },
  {
    id: 1,
    value: "createdAt",
    text: "Hàng cũ nhất",
  },
];
