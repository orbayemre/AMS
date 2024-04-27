import Home from "./pages/Home";
import UserLogin from "./pages/UserLogin";
import BusinessLogin from "./pages/BusinessLogin";
import BusinessRegister from "./pages/BusinessRegister";
import UserRegister from "./pages/UserRegister";
import ResetPassword from "./pages/ResetPassword";
import "./Translations";
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
    path:'*',
    element: <div>Not Found</div>
  }
];

export default Routes;