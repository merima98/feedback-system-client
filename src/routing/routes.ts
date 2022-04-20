import Login from "../components/login/Login";
import Register from "../components/register/Register";

const NON_LOGGED_IN_USER_ROUTES = [
  {
    path: "/",
    element: Register,
  },
  {
    path: "/login",
    element: Login,
  },
];

export { NON_LOGGED_IN_USER_ROUTES };
