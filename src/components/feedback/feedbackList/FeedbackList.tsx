import { Container } from "@mui/material";
import { useQuery } from "react-query";

import queries from "../../../api/queries";
import { Feedback } from "../../../model/feedback";
import SingleFeedback from "../singleFeedback/SingleFeedback";

const FeedbackList = () => {
  const { data } = useQuery("feedback-list", () => queries.getAllFeedback());

  return (
    <Container maxWidth={"sm"}>
      {data?.data.map((feedback: Feedback) => {
        return (
          <SingleFeedback
            key={feedback.id}
            id={feedback.id}
            content={feedback.content}
            createdAt={feedback.createdAt}
            updatedAt={feedback.updatedAt}
            userId={feedback.userId}
            reporterId={feedback.reporterId}
          />
        );
      })}
    </Container>
  );
};

export default FeedbackList;
