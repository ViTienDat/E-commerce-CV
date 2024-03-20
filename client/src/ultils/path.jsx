const path = {
  PUBLIC: "/",
  HOME: "",
  ALL: "*",
  LOGIN: "login",
  PRODUCTS: "product",
  ACCOUNT_TEST: "account-test",
  PRODUCTS__CATEGORY: "product/:category",
  DETAIL_CART: "detail-cart",
  CONTACT: "contact",
  DETAIL_PRODUCT__PID__TITLE: "san-pham/:pid/:title",
  DETAIL_PRODUCT: "san-pham",
  CHECKOUT: "checkout",
  SEARCH: "search",
  // SEARCH_PRODUCT: "search/:title",
  //admin
  ADMIN: "admin",
  UPDATE_ADMIN: "update-admin",
  MANAGE_USER: "manage-user",
  MANAGE_ORDER: "manage-order",
  MANAGE_PRODUCTS: "manage-products",
  CREATE_PRODUCT: "create-product",

  //member
  MEMBER: "member",
  PERSONAL: "personal",
  MY_CART: "my-cart",
  WISLIST: "wislist",
  HISTORY: "history",
};

export default path;
