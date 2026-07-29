import React, { useEffect, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { load_UserProfile } from "./actions/userAction";
import CricketBallLoader from "./component/layouts/loader/Loader";
import PrivateRoute from "./component/Route/PrivateRoute";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./App.css";

import Header from "./component/layouts/Header1.jsx/Header";
import Footer from "./component/layouts/Footer/Footer";

const LazyHome = React.lazy(() => import("./component/Home/Home"));
const LazyProductDetails = React.lazy(() => import("./component/Product/ProductDetails"));
const LazyProducts = React.lazy(() => import("./component/Product/Products"));
const LazySignup = React.lazy(() => import("./component/User/SignUp"));
const LazyLogin = React.lazy(() => import("./component/User/Login"));
const LazyProfile = React.lazy(() => import("./component/User/Profile"));
const LazyUpdateProfile = React.lazy(() => import("./component/User/UpdateProfile"));
const LazyUpdatePassword = React.lazy(() => import("./component/User/UpdatePassword"));
const LazyForgetPassword = React.lazy(() => import("./component/User/ForgetPassword"));
const LazyResetPassword = React.lazy(() => import("./component/User/ResetPassword"));
const LazyShipping = React.lazy(() => import("./component/Cart/Shipping"));
const LazyCart = React.lazy(() => import("./component/Cart/Cart"));
const LazyConfirmOrder = React.lazy(() => import("./component/Cart/ConfirmOrder"));
const LazyOrderSuccess = React.lazy(() => import("./component/Cart/OrderSuccess"));
const LazyMyOrder = React.lazy(() => import("./component/order/MyOrder"));
const LazyContactForm = React.lazy(() => import("./Terms&Condtions/Contact"));
const LazyAboutUsPage = React.lazy(() => import("./Terms&Condtions/Aboutus"));
const LazyReturnPolicyPage = React.lazy(() => import("./Terms&Condtions/Return"));
const LazyTermsUse = React.lazy(() => import("./Terms&Condtions/TermsAndUse"));
const LazyTermsAndConditions = React.lazy(() => import("./Terms&Condtions/TermsCondtion"));
const LazyPrivacyPolicy = React.lazy(() => import("./Terms&Condtions/Privacy"));
const LazyServices = React.lazy(() => import("./Terms&Condtions/Service"));
const LazyPaymentRoute = React.lazy(() => import("./component/Cart/PaymentRoute"));

const LazyDashboard = React.lazy(() => import("./component/Admin/Dashboard"));
const LazyProductList = React.lazy(() => import("./component/Admin/ProductList"));
const LazyOrderList = React.lazy(() => import("./component/Admin/OrderList"));
const LazyUserList = React.lazy(() => import("./component/Admin/UserList"));
const LazyUpdateProduct = React.lazy(() => import("./component/Admin/UpdateProduct"));
const LazyProcessOrder = React.lazy(() => import("./component/Admin/ProcessOrder"));
const LazyUpdateUser = React.lazy(() => import("./component/Admin/UpdateUser"));
const LazyNewProduct = React.lazy(() => import("./component/Admin/NewProduct"));
const LazyProductReviews = React.lazy(() => import("./component/Admin/ProductReviews"));
const LazyBannerList = React.lazy(() => import("./component/Admin/BannerList"));
const LazyNewBanner = React.lazy(() => import("./component/Admin/NewBanner"));
const LazyUpdateBanner = React.lazy(() => import("./component/Admin/UpdateBanner"));

const PageLayout = ({ children, showServices = true }) => (
  <>
    <Header />
    <Suspense fallback={<CricketBallLoader />}>{children}</Suspense>
    {showServices && (
      <Suspense fallback={null}>
        <LazyServices />
      </Suspense>
    )}
    <Footer />
  </>
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_UserProfile());
  }, [dispatch]);

  return (
    <>
      <SpeedInsights />
      <Suspense fallback={<CricketBallLoader />}>
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <PageLayout>
                <LazyHome />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/product/:id"
            render={() => (
              <PageLayout>
                <LazyProductDetails />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/products"
            render={() => (
              <PageLayout>
                <LazyProducts />
              </PageLayout>
            )}
          />

          <Route
            path="/products/:keyword"
            render={() => (
              <PageLayout>
                <LazyProducts />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/signup"
            render={() => (
              <PageLayout>
                <LazySignup />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/login"
            render={() => (
              <PageLayout>
                <LazyLogin />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/password/forgot"
            render={() => (
              <PageLayout>
                <LazyForgetPassword />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/password/reset/:token"
            render={() => (
              <PageLayout>
                <LazyResetPassword />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/cart"
            render={() => (
              <PageLayout>
                <LazyCart />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/policy/return"
            render={() => (
              <PageLayout>
                <LazyReturnPolicyPage />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/policy/Terms"
            render={() => (
              <PageLayout>
                <LazyTermsUse />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/policy/privacy"
            render={() => (
              <PageLayout>
                <LazyPrivacyPolicy />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/terms/conditions"
            render={() => (
              <PageLayout>
                <LazyTermsAndConditions />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/contact"
            render={() => (
              <PageLayout showServices={false}>
                <LazyContactForm />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/about_us"
            render={() => (
              <PageLayout showServices={false}>
                <LazyAboutUsPage />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/account"
            render={() => (
              <PageLayout>
                <PrivateRoute exact path="/account" component={LazyProfile} />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/profile/update"
            render={() => (
              <PageLayout>
                <PrivateRoute exact path="/profile/update" component={LazyUpdateProfile} />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/password/update"
            render={() => (
              <PageLayout>
                <PrivateRoute exact path="/password/update" component={LazyUpdatePassword} />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/orders"
            render={() => (
              <PageLayout>
                <PrivateRoute exact path="/orders" component={LazyMyOrder} />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/shipping"
            render={() => (
              <PageLayout>
                <PrivateRoute exact path="/shipping" component={LazyShipping} />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/order/confirm"
            render={() => (
              <PageLayout>
                <PrivateRoute exact path="/order/confirm" component={LazyConfirmOrder} />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/success"
            render={() => (
              <PageLayout>
                <PrivateRoute exact path="/success" component={LazyOrderSuccess} />
              </PageLayout>
            )}
          />

          <Route
            exact
            path="/process/payment"
            render={() => (
              <PageLayout showServices={false}>
                <PrivateRoute exact path="/process/payment" component={LazyPaymentRoute} />
              </PageLayout>
            )}
          />

          <PrivateRoute isAdmin={true} exact path="/admin/dashboard" component={LazyDashboard} />
          <PrivateRoute isAdmin={true} exact path="/admin/products" component={LazyProductList} />
          <PrivateRoute isAdmin={true} exact path="/admin/product/:id" component={LazyUpdateProduct} />
          <PrivateRoute isAdmin={true} exact path="/admin/reviews" component={LazyProductReviews} />
          <PrivateRoute isAdmin={true} exact path="/admin/orders" component={LazyOrderList} />
          <PrivateRoute isAdmin={true} exact path="/admin/order/:id" component={LazyProcessOrder} />
          <PrivateRoute isAdmin={true} exact path="/admin/new/product" component={LazyNewProduct} />
          <PrivateRoute isAdmin={true} exact path="/admin/users" component={LazyUserList} />
          <PrivateRoute isAdmin={true} exact path="/admin/user/:id" component={LazyUpdateUser} />
          <PrivateRoute isAdmin={true} exact path="/admin/banners" component={LazyBannerList} />
          <PrivateRoute isAdmin={true} exact path="/admin/banner/new" component={LazyNewBanner} />
          <PrivateRoute isAdmin={true} exact path="/admin/banner/:id" component={LazyUpdateBanner} />
        </Switch>
      </Suspense>
    </>
  );
}

export default App;
