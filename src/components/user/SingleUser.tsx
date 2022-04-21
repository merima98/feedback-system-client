import { Container } from "@mui/material";
import { useQuery } from "react-query";

import queries from "../../api/queries";

const SingleUser = () => {
  // this component will be used for getUserById - where we will have information about single user
  const userId = window.localStorage.getItem("userId");
  const { data } = useQuery("single-user", () =>
    queries.getUserById(Number(userId))
  );

  return <Container maxWidth="sm">Single user page</Container>;
};

export default SingleUser;
