import { Route, Routes, useFetcher } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Products,
  Contact,
  DetailProduct,
  DetailCart,
  SearchProduct,
  AccountTest,
} from "./pages/public";
import {
  AdminLayout,
  ManageProduct,
  ManageUser,
  CreateProduct,
  Admin,
  ManageOrder,
} from "./pages/admin";
import {
  MemberLayout,
  Personal,
  Mycart,
  History,
  Wislist,
  CheckOut,
} from "./pages/member";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Modal,
  Cart,
  WislistBar,
  Loading,
  Size,
  DetailOrder,
} from "./components";
import { showCart, showWislist } from "./store/app/appSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  const { isShowModal, modalChildren, isShowCart, isShowWislist } = useSelector(
    (state) => state.app
  );
  return (
    <div className="font-main relative">
      {isShowCart && (
        <div
          onClick={() => dispatch(showCart({ signal: false }))}
          className="fixed inset-0 bg-overlay z-50 flex justify-end"
        >
          <Cart />
        </div>
      )}
      {isShowWislist && (
        <div
          onClick={() => dispatch(showWislist({ signal: false }))}
          className="fixed inset-0 bg-overlay z-50 flex justify-end"
        >
          <WislistBar />
        </div>
      )}
      {isShowModal && (
        <Modal>
          {modalChildren == "loading" ? (
            <Loading />
          ) : typeof modalChildren == "object" ? (
            <DetailOrder items={modalChildren} />
          ) : (
            <Size category={modalChildren} />
          )}
        </Modal>
      )}
      <Routes>
        <Route path={path.CHECKOUT} element={<CheckOut />} />
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.ACCOUNT_TEST} element={<AccountTest />} />
          <Route path={path.DETAIL_CART} element={<DetailCart />} />
          <Route path={path.SEARCH} element={<SearchProduct />} />
          <Route
            path={path.DETAIL_PRODUCT__PID__TITLE}
            element={<DetailProduct />}
          />
        </Route>

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.UPDATE_ADMIN} element={<Admin />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
          <Route path={path.MY_CART} element={<Mycart />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.WISLIST} element={<Wislist />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.ALL} element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
