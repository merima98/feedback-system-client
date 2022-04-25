import { Container } from "@mui/material";
import { useQuery } from "react-query";

import queries from "../../../api/queries";
import { Feedback } from "../../../model/feedback";

import SingleLatestFeedback from "../singleLatestFeedback/SingleLatestFeedback";

const LatestFeedbackList = () => {
  const { data } = useQuery("latest-feedback", queries.latestFeedback);

  return (
    <Container maxWidth={"sm"} sx={{ mt: 2 }}>
      {data?.data.map((feedback: Feedback) => {
        return (
          <SingleLatestFeedback
            user={feedback.user}
            createdAt={feedback.createdAt}
            id={feedback.id}
            reporterId={feedback.reporterId}
            updatedAt={feedback.updatedAt}
            userId={feedback.userId}
            key={feedback.id}
            content={feedback.content}
          />
        );
      })}
    </Container>
  );
};

export default LatestFeedbackList;
