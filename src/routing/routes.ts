import FeedbackDetails from "../components/feedback/feedbackDetails/FeedbackDetails";
import FeedbackList from "../components/feedback/feedbackList/FeedbackList";
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
  {
    path: "/feedback",
    element: FeedbackList,
  },
  {
    path: "/feedback/:id",
    element: FeedbackDetails,
  },
];

const LOGGED_IN_USER_ROUTES = [
  {
    path: "/",
    element: FeedbackList,
  },
  {
    path: "/newest",
    element: FeedbackList,
  },
  {
    path: "/feedback/:id",
    element: FeedbackDetails,
  },
];

export { NON_LOGGED_IN_USER_ROUTES, LOGGED_IN_USER_ROUTES };
