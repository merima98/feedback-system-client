import { Box } from "@mui/material";
import { format } from "date-fns";

import { Feedback } from "../../../model/feedback";

const SingleLatestFeedback = (props: Feedback) => {
  const { content, createdAt, user } = props;

  function convertDate(date?: string) {
    if (date) {
      let dateParse = Date.parse(date);
      let value = format(dateParse, "dd.MM.yyyy");
      return value;
    }
  }

  return (
    <Box
      sx={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        mb: 2,
        border: "1px solid",
        borderColor: "#e0e0e0",
        p: 2,
      }}
    >
      <Box
        component={"span"}
        sx={{
          mb: 2,
          textTransform: "uppercase",
          fontSize: 12,
          fontWeight: "bold",
        }}
      >
        {user.firstName} {user.lastName}
      </Box>
      <Box
        component="span"
        sx={{
          fontSize: 15,
          mb: 2,
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        {content}
      </Box>
      <Box component="span" sx={{ fontSize: 12 }}>
        {convertDate(createdAt)}
      </Box>
    </Box>
  );
};

export default SingleLatestFeedback;
