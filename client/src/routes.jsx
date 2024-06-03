import Home from "./pages/Home";
import UserLogin from "./pages/user/UserLogin";
import BusinessLogin from "./pages/business/BusinessLogin";
import BusinessRegister from "./pages/business/BusinessRegister";
import UserRegister from "./pages/user/UserRegister";
import ResetPassword from "./pages/ResetPassword";
import BusinessDetail from "./pages/business/BusinessDetail";
import BusinessAccount from "./pages/business/BusinessAccount";
import MyAppointments from "./pages/user/MyAppointments";
import PageTitle from "./pages/PageTitle";


import "./Translations";
import Search from "./pages/Search";
import MyAccount from "./pages/user/MyAccount";
const Routes = [
  {
    index: true,
    element: <>
      <PageTitle page="home page title" />
      <Home />
    </>
  },
  {
    path:'/user/login',
    element: <>
      <PageTitle page="user login title" />
      <UserLogin/>
    </>
  },
  {
    path:'/business/login',
    element: <>
      <PageTitle page="business login title" />
      <BusinessLogin/>
    </>
  },
  {
    path:'/user/register',
    element: <>
      <PageTitle page="user register title" />
      <UserRegister/>
    </>
  },
  {
    path:'/business/register',
    element: <>
      <PageTitle page="business register title" />
      <BusinessRegister/>
    </>
  },
  {
    path:'/user/reset-password/:token',
    element: <>
      <PageTitle page="user reset title" />
      <ResetPassword/>
    </>
  },
  {
    path:'/business/reset-password/:token',
    element: <>
      <PageTitle page="business reset title" />
      <ResetPassword/>
    </>
  },
  {
    path:'/business/detail/:bId',
    element: <>
      <PageTitle page="business detail title" />
      <BusinessDetail/>
    </>
  },
  {
    path:'/business/account',
    element: <>
      <PageTitle page="business account title" />
      <BusinessAccount/>
    </>
  },
  {
    path:'/search',
    element: <>
      <PageTitle page="search title" />
      <Search/>
    </>
  },
  {
    path:'/user/my-appointments',
    element: <>
      <PageTitle page="user my appointments title" />
      <MyAppointments/>
    </>
  },
  {
    path:'/user/my-account',
    element: <>
      <PageTitle page="user my account title" />
      <MyAccount/>
    </>
  },
  {
    path:'*',
    element: <div>Not Found</div>
  }
];

export default Routes;