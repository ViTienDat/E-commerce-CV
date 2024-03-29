import path from "./path";
import icons from "./icons";

const {
  MdDashboard,
  FaLayerGroup,
  RiBillFill,
  IoPerson,
  BiLogoProductHunt,
  FaShoppingCart,
  FaHeart,
} = icons;

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
    value: "ACCOUNT-TEST",
    path: `${path.ACCOUNT_TEST}`,
  },
  {
    id: 4,
    value: "CONTACT",
    path: `${path.CONTACT}`,
  },
];

export const selectOption = [
  {
    id: 1,
    value: "createdAt",
    text: "Mặc định",
  },
  {
    id: 2,
    value: "title",
    text: "A-Z",
  },
  {
    id: 3,
    value: "-title",
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
    id: 6,
    value: "-createdAt",
    text: "Hàng mới nhất",
  },
  {
    id: 7,
    value: "createdAt",
    text: "Hàng cũ nhất",
  },
];

export const adminSidebar = [
  {
    id: 1,
    type: "single",
    text: "Update admin",
    path: `/${path.ADMIN}/${path.UPDATE_ADMIN}`,
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

export const memberSidebar = [
  {
    id: 1,
    type: "single",
    text: "Personal",
    path: `/${path.MEMBER}/${path.PERSONAL}`,
    icon: <IoPerson size={20} />,
  },
  {
    id: 2,
    type: "single",
    text: "My cart",
    path: `/${path.MEMBER}/${path.MY_CART}`,
    icon: <FaShoppingCart size={20} />,
  },
  {
    id: 3,
    type: "single",
    text: "Wislist",
    path: `/${path.MEMBER}/${path.WISLIST}`,
    icon: <FaHeart size={20} />,
  },
  {
    id: 4,
    type: "single",
    text: "History buy",
    path: `/${path.MEMBER}/${path.HISTORY}`,
    icon: <RiBillFill size={20} />,
  },
];

export const colorBoard = [
  {
    name: "black",
    color: "bg-black",
  },
  {
    name: "red",
    color: "bg-red-500",
  },
  {
    name: "white",
    color: "bg-white",
  },
  {
    name: "pink",
    color: "bg-pink-500",
  },
  {
    name: "mint",
    color: "bg-cyan-500",
  },
  {
    name: "blue",
    color: "bg-blue-500",
  },
  {
    name: "yellow",
    color: "bg-yellow-500",
  },
  {
    name: "tan",
    color: "bg-orange-400",
  },
  {
    name: "gray",
    color: "bg-gray-500",
  },
];
