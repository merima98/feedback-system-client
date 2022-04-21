import { Box, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { User } from "../../../model/user";

const SingleFeedback = (props: User) => {
  const { id, feedbacks, firstName, lastName, role } = props;
  const navigation = useNavigate();

  const navigateToFeedbackList = () => {
    navigation(`/feedback/${id}`);
  };

  return (
    <Tooltip
      title="Click here to see details."
      onClick={navigateToFeedbackList}
    >
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
          {firstName} {lastName}
        </Box>
        <Box component={"span"} sx={{ mb: 2, fontSize: 15 }}>
          Role: {role}
        </Box>
        <Box component={"span"} sx={{ fontSize: 12, fontWeight: "bold" }}>
          Number of feedbacks: {feedbacks.length}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default SingleFeedback;
