import styled from "styled-components";
import { FormLabel } from "@mui/material";
import { Link } from "react-router-dom";

const StyledErrorMessage = styled(FormLabel)`
  color: red;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #2196f3;
`;

export { StyledErrorMessage, StyledLink };
