import path from "./path";
import icons from "./icons";

const { MdDashboard, FaLayerGroup, RiBillFill, BiLogoProductHunt } = icons;

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

export const adminSidebar = [
  {
    id: 1,
    type: "single",
    text: "Dashboard",
    path: `/${path.ADMIN}/${path.DASHBOARD}`,
    icon: <MdDashboard size={20} />,
  },
  {
    id: 2,
    type: "single",
    text: "Manage users",
    path: `/${path.ADMIN}/${path.MANAGE_USER}`,
    icon: <FaLayerGroup size={20} />,
  },
  {
    id: 3,
    type: "parent",
    text: "Products",
    icon: <BiLogoProductHunt size={20} />,
    submenu: [
      {
        text: "Create product",
        path: `/${path.ADMIN}/${path.CREATE_PRODUCT}`,
      },
      {
        text: "Manage product",
        path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
      },
    ],
  },
  {
    id: 4,
    type: "single",
    text: "Manage oders",
    path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
    icon: <RiBillFill size={20} />,
  },
];
