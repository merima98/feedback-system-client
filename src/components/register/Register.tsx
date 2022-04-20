import { Button, Container, FormControl, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { StyledErrorMessage } from "./FormFiled";
import { FieldValues, useForm } from "react-hook-form";

const Register = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function onSubmit(values: FieldValues) {
    console.log("Form data is, ", values);
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          padding={5}
          sx={{
            justifyContent: "center",
            mt: 10,
            border: "1px solid",
            borderColor: "#e0e0e0",
          }}
        >
          <FormControl sx={{ mb: 2 }}>
            <TextField
              label="First name"
              size="small"
              {...register("firstName", {
                required: "First name is required field",
                minLength: {
                  value: 2,
                  message: "First name must have at least two characters!",
                },
              })}
            />
            {errors.firstName && (
              <StyledErrorMessage sx={{ fontSize: 12 }}>
                {errors.firstName.message}{" "}
              </StyledErrorMessage>
            )}
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              label="Last name"
              size="small"
              {...register("lastName", {
                required: "Last name is required field!",
                minLength: {
                  value: 2,
                  message: "Last name must have at least two characters",
                },
              })}
            />

            {errors.lastName && (
              <StyledErrorMessage sx={{ fontSize: 12 }}>
                {errors.lastName.message}{" "}
              </StyledErrorMessage>
            )}
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              label="Email"
              size="small"
              type={"email"}
              {...register("email", {
                required: "Email is required field!",
              })}
            />
            {errors.email && (
              <StyledErrorMessage sx={{ fontSize: 12 }}>
                {errors.email.message}{" "}
              </StyledErrorMessage>
            )}
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              label="Password"
              type={"password"}
              size="small"
              autoComplete="password"
              {...register("password", {
                required: "Password is required field!",
                minLength: {
                  value: 4,
                  message: "Password must have at least four characters!",
                },
              })}
            />
            {errors.password && (
              <StyledErrorMessage sx={{ fontSize: 12 }}>
                {errors.password.message}{" "}
              </StyledErrorMessage>
            )}
          </FormControl>
          <Button size="small" type="submit">
            Reigster
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
