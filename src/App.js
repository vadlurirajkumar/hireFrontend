import React from "react";
import { Routes, Route } from "react-router-dom";

//Importing Scroll to top file
import ScrollToTop from "./Utils/ScrollToTop";

//Importing Public Pages
import Home from "./Pages/Home/Home";
import Loading from "./Utils/Loading";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";

//Importing Employee Pages
import RegisterEmploye from "./Pages/Employee/Signup/RegisterEmploye";
import EmployeeLogIn from "./Pages/Employee/Login/EmployeeLogIn";
import ForgotEmployee from "./Pages/Employee/ForgotPassword/ForgotEmployee";
import Referalpage from "./Pages/Employee/Referalpage/Referalpage";
import Subscriptionpage from "./Pages/Employee/Subscriptionpage/Subscriptionpage";

//Employee Private Routes
import EmployeePrivateRoutes from "./Utils/EmployeePrivateRoutes";
import Profile from "./Pages/Employee/Profile/Profile";

//Importing Employer Pages
import Companyprofilepage from "./Pages/Employer/Companyprofilepage/Companyprofilepage";
import HireTalent from "./Pages/Employer/Hire/HireTalent";

//Employer Private Routes

//Contexts
import ForgotFormContexProvider from "./Contex/ForgotFormContex";
import OtpPageContexProvider from "./Contex/OtpPageContex";

const About = React.lazy(() => import("./Pages/About/About"));

function App() {

  return (
    <ScrollToTop>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/aboutus"
          element={
            <React.Suspense fallback={<Loading />}>
              <About />
            </React.Suspense>
          }
        />
        <Route path="*" element={<PageNotFound />} />

        {/* Employer Routes Public Routes*/}

        {/* Employer Routes Private Routes*/}
        <Route path="/referal" element={<Referalpage />} />
        <Route path="/myprofile" element={<Companyprofilepage />} />
        <Route path="/wallet" element={<Subscriptionpage />} />
        <Route path="/hire" element={<HireTalent />} />

        {/* Employee Routes public Routes*/}
        <Route
          path="employee-signup"
          element={
            <OtpPageContexProvider>
              <RegisterEmploye />
            </OtpPageContexProvider>
          }
        />
        <Route path="employee-login" element={<EmployeeLogIn />} />
        <Route
          path="employee-forgot-password"
          element={
            <ForgotFormContexProvider>
              <ForgotEmployee />
            </ForgotFormContexProvider>
          }
        />

        {/* Employee Routes Private Routes*/}
        <Route path="/employee" element={<EmployeePrivateRoutes />}>
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
}

export default App;
