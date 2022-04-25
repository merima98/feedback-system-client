import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import queries from "../../../api/queries";
import NewFeedbackForm from "../newFeedbackForm/NewFeedbackForm";
import { Feedback } from "../../../model/feedback";
import SingleFeedbackComment from "../singleFeedback/SingleFeedbackComment";

const FeedbackDetails = () => {
  const reporterId = window.localStorage.getItem("userId");

  const params = useParams();
  const { data } = useQuery("single-feedback", () =>
    queries.getUserById(Number(params.id))
  );

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 5,
          border: "1px solid",
          borderColor: "#e0e0e0",
          mb: 2,
        }}
      >
        <Box
          component={"span"}
          sx={{
            fontSize: 12,
            fontWeight: "bold",
            textTransform: "uppercase",
            mb: 2,
          }}
        >
          {data?.data.firstName} {data?.data.lastName}
        </Box>
        <Box component={"span"} sx={{ fontSize: 15, mb: 2 }}>
          Role: {data?.data.role}
        </Box>

        <Box component={"span"} sx={{ fontSize: 15 }}>
          Number of feedbacks: {data?.data.feedbacks.length}
        </Box>
      </Box>
      <NewFeedbackForm
        userId={Number(params.id)}
        reporterId={Number(reporterId)}
      />
      <Box sx={{ cursor: "pointer" }}>
        {data?.data.feedbacks?.map((feedback: Feedback) => {
          return (
            <SingleFeedbackComment
              user={feedback.user}
              key={feedback.id}
              content={feedback.content}
              createdAt={feedback.createdAt}
              id={feedback.id}
              reporterId={feedback.reporterId}
              updatedAt={feedback.updatedAt}
              userId={feedback.userId}
            />
          );
        })}
      </Box>
    </Container>
  );
};

export default FeedbackDetails;
