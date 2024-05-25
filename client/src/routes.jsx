import Home from "./pages/Home";
import UserLogin from "./pages/user/UserLogin";
import BusinessLogin from "./pages/business/BusinessLogin";
import BusinessRegister from "./pages/business/BusinessRegister";
import UserRegister from "./pages/user/UserRegister";
import ResetPassword from "./pages/ResetPassword";
import BusinessDetail from "./pages/business/BusinessDetail";
import BusinessAccount from "./pages/business/BusinessAccount";
import MyAppointments from "./pages/user/MyAppointments";


import "./Translations";
import Search from "./pages/Search";
const Routes = [
  {
    index: true,
    element:<Home/>
  },
  {
    path:'/user/login',
    element: <UserLogin/>
  },
  {
    path:'/business/login',
    element: <BusinessLogin/>
  },
  {
    path:'/user/register',
    element: <UserRegister/>
  },
  {
    path:'/business/register',
    element: <BusinessRegister/>
  },
  {
    path:'/user/reset-password/:token',
    element: <ResetPassword/>
  },
  {
    path:'/business/reset-password/:token',
    element: <ResetPassword/>
  },
  {
    path:'/business/detail/:bId',
    element: <BusinessDetail/>
  },
  {
    path:'/business/account',
    element: <BusinessAccount/>
  },
  {
    path:'/search',
    element: <Search/>
  },
  {
    path:'/user/my-appointments',
    element: <MyAppointments/>
  },
  {
    path:'*',
    element: <div>Not Found</div>
  }
];

export default Routes;