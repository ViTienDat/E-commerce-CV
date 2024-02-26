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
        <Route path={path.LOGIN} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
