import { Container, Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import queries from "../../../api/queries";

const FeedbackDetails = () => {
  const params = useParams();
  const { data } = useQuery("single-feedback", () =>
    queries.getUserById(Number(params.id))
  );

  return (
    <Container
      maxWidth={"sm"}
      sx={{
        mt: 2,
        p: 5,
        border: "1px solid",
        borderColor: "#e0e0e0",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
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
          Role: {data?.data.feedbacks.length}
        </Box>
      </Box>
    </Container>
  );
};

export default FeedbackDetails;
