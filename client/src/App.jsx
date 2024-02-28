import { Route, Routes, useFetcher } from "react-router-dom";
import {
  Login,
  Home,
  Public,
  Products,
  Contact,
  DetailProduct,
  Account,
} from "./pages/public";
import {
  AdminLayout,
  ManageProduct,
  ManageUser,
  CreateProduct,
  Dashboard,
  ManageOrder,
} from "./pages/admin";
import { MemberLayout, Personal } from "./pages/member";
import path from "./ultils/path";
import { getCategories } from "./store/app/asyncActions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.PRODUCTS__CATEGORY} element={<Products />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.ACCOUNT} element={<Account />} />
          <Route
            path={path.DETAIL_PRODUCT__PID__TITLE}
            element={<DetailProduct />}
          />
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<Dashboard />} />
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
          <Route path={path.MANAGE_USER} element={<ManageUser />} />
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.ALL} element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
