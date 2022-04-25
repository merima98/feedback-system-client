import FeedbackDetails from "../components/feedback/feedbackDetails/FeedbackDetails";
import FeedbackList from "../components/feedback/feedbackList/FeedbackList";
import LatestFeedbackList from "../components/feedback/latestFeedbackList/LatestFeedbackList";
import SingleFeedbackCommentDetails from "../components/feedback/singleFeedback/SingleFeedbackCommentDetails";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import SingleUser from "../components/user/SingleUser";

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
  {
    path: "/feedback-details/:id",
    element: SingleFeedbackCommentDetails,
  },
  {
    path: "/newest",
    element: LatestFeedbackList,
  },
];

const LOGGED_IN_USER_ROUTES = [
  {
    path: "/",
    element: FeedbackList,
  },
  {
    path: "/newest",
    element: LatestFeedbackList,
  },
  {
    path: "/feedback/:id",
    element: FeedbackDetails,
  },
  {
    path: "/feedback-details/:id",
    element: SingleFeedbackCommentDetails,
  },
  {
    path: "/my-profile",
    element: SingleUser,
  },
];

export { NON_LOGGED_IN_USER_ROUTES, LOGGED_IN_USER_ROUTES };
