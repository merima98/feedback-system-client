import { Container, Box } from "@mui/material";
import { useQuery } from "react-query";

import queries from "../../api/queries";

const SingleUser = () => {
  const userId = window.localStorage.getItem("userId");
  const { data } = useQuery("single-user", () =>
    queries.getUserById(Number(userId))
  );

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: "flex",
          mt: 4,
          flexDirection: "column",
          p: 5,
          border: "1px solid",
          borderColor: "#e0e0e0",
        }}
      >
        <Box
          component="span"
          sx={{
            mb: 2,
            fontSize: 15,
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          {data?.data.firstName} {data?.data.lastName}
        </Box>
        <Box
          sx={{
            mb: 2,
            fontSize: 12,
          }}
          component="span"
        >
          {data?.data.email}
        </Box>
        <Box
          sx={{
            mb: 2,
            fontSize: 12,
          }}
          component="span"
        >
          {data?.data.role}
        </Box>
      </Box>
    </Container>
  );
};

export default SingleUser;
