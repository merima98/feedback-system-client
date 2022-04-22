import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { Box, Button, Container } from "@mui/material";

import queries from "../../../api/queries";
import { format } from "date-fns";

const SingleFeedbackCommentDetails = () => {
  const params = useParams();

  const { data } = useQuery("feedback-details", () =>
    queries.getSingleFeedback(Number(params.id))
  );

  function convertDate(date?: string) {
    if (date) {
      let dateParse = Date.parse(date);
      let value = format(dateParse, "dd.MM.yyyy");
      return value;
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 12 }}>
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
          sx={{
            mb: 2,
            fontSize: 15,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
          component="span"
        >
          {data?.data.content}
        </Box>
        <Box sx={{ mb: 2, fontSize: 12 }}>
          Report date: {convertDate(data?.data.createdAt)}
        </Box>
        <Box sx={{ mb: 2, fontSize: 12 }}>
          Last modified at: {convertDate(data?.data.updatedAt)}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button variant="contained" size="small">
          Edit
        </Button>
        <Button size="small" color="error" variant="contained">
          Delete
        </Button>
      </Box>
    </Container>
  );
};

export default SingleFeedbackCommentDetails;
