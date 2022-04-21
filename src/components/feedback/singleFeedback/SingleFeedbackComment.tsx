import { Box } from "@mui/material";
import { format } from "date-fns";

import { Feedback } from "../../../model/feedback";

const SingleFeedbackComment = (props: Feedback) => {
  function convertDate(date?: string) {
    if (date) {
      let dateParse = Date.parse(date);
      let value = format(dateParse, "dd.MM.yyyy");
      return value;
    }
  }
  const { content, createdAt, updatedAt } = props;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 2,
        p: 2,
        border: "1px solid",
        borderColor: "#e0e0e0",
      }}
    >
      <Box
        sx={{
          mb: 2,
          fontSize: 15,
          textTransform: "uppercase",
          fontWeight: "bold",
        }}
        component={"span"}
      >
        {content}
      </Box>
      <Box sx={{ mb: 2, fontSize: 12 }} component={"span"}>
        Creted at: {convertDate(createdAt)}
      </Box>
      <Box sx={{ fontSize: 12 }} component={"span"}>
        Last updated at: {convertDate(updatedAt)}
      </Box>
    </Box>
  );
};

export default SingleFeedbackComment;
