import { Container } from "@mui/material";
import { useQuery } from "react-query";

import queries from "../../../api/queries";
import { User } from "../../../model/user";
import SingleFeedback from "../singleFeedback/SingleFeedback";

const FeedbackList = () => {
  const { data } = useQuery("feedback-list", () => queries.getAllUsers());

  return (
    <Container maxWidth={"sm"} sx={{ mt: 2 }}>
      {data?.data.map((user: User) => {
        return (
          <SingleFeedback
            key={user.id}
            id={user.id}
            email={user.email}
            feedbacks={user.feedbacks}
            firstName={user.firstName}
            lastName={user.lastName}
            password={user.password}
            role={user.role}
          />
        );
      })}
    </Container>
  );
};

export default FeedbackList;
