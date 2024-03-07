import Home from "./pages/Home";

const Routes = [
  {
    index: true,
    element:<Home/>
  },
  {
    path:'/login',
    element: <div>Login</div>
  },
  {
    path:'/register',
    element: <div>Register</div>
  },
  {
    path:'*',
    element: <div>Not Found</div>
  }
];

export default Routes;