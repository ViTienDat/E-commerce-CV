const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: "product",
  PRODUCTS__CATEGORY: "product/:category",
  ACCOUNT: "account",
  CONTACT: "contact",
  DETAIL_PRODUCT__PID__TITLE: "san-pham/:pid/:title",
  DETAIL_PRODUCT: "san-pham",

  //admin
  ADMIN: "admin",
  DASHBOARD: "dashboard",
  MANAGE_USER: "manage-user",
  MANAGE_ORDER: "manage-order",
  MANAGE_PRODUCTS: "manage-products",
  CREATE_PRODUCT: "create-product",

  //member
  MEMBER: "member",
  PERSONAL: "personal",
};

export default path;
