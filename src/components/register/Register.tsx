import {
  Button,
  Container,
  FormControl,
  TextField,
  LinearProgress,
  Snackbar,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import { ErrorOption, FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { forwardRef, useState } from "react";

import { StyledErrorMessage, StyledLink } from "./RegisterStyle";
import mutations from "../../api/mutations";
import { useAuth } from "../../state";
import { Eye, EyeOff } from "react-feather";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alet(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Register = () => {
  const {
    handleSubmit,
    setError,
    register,
    formState: { errors },
  } = useForm();

  const navigation = useNavigate();
  const setIsLoggedIn = useAuth((state) => state.setIsLoggedIn);
  const [isVisible, setVisibility] = useState(false);
  const [open, setOpen] = useState(false);

  const registerMutation = useMutation(mutations.register, {
    onSuccess: (data) => {
      setOpen(false);
      setIsLoggedIn(true, data.data.user.id, data.data.accessToken);
      navigation("/");
    },
    onError: (error: ErrorOption) => {
      setError("email", error, { shouldFocus: true });
      setOpen(true);
    },
  });

  function onSubmit(values: FieldValues) {
    registerMutation.mutate(values);
  }

  const handleOnClose = () => {
    setOpen(false);
  };

  const handlePasswordVisibility = () => {
    setVisibility(!isVisible);
  };

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
              cy-test="cy-test-first-name"
              size="small"
              {...register("firstName", {
                required: "First name is required field!",
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
              cy-test="cy-test-last-name"
              size="small"
              {...register("lastName", {
                required: "Last name is required field!",
                minLength: {
                  value: 2,
                  message: "Last name must have at least two characters!",
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
              cy-test="cy-test-register-email"
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
              cy-test="cy-test-register-password"
              type={isVisible ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ paddingRight: "0px" }}>
                    {isVisible ? (
                      <EyeOff
                        style={{ cursor: "pointer", color: "#2196f3" }}
                        onClick={handlePasswordVisibility}
                      />
                    ) : (
                      <Eye
                        style={{ cursor: "pointer", color: "#2196f3" }}
                        onClick={handlePasswordVisibility}
                      />
                    )}
                  </InputAdornment>
                ),
              }}
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
          <FormControl sx={{ mb: 2 }}>
            <TextField
              label="Your role"
              cy-test="cy-test-register-role"
              size="medium"
              autoComplete="role"
              {...register("role", {
                required: "Role is required field!",
                minLength: {
                  value: 4,
                  message: "Role must have at least four characters!",
                },
              })}
            />
            {errors.role && (
              <StyledErrorMessage sx={{ fontSize: 12 }}>
                {errors.role.message}{" "}
              </StyledErrorMessage>
            )}
          </FormControl>
          <Button
            size="small"
            type="submit"
            data-testid="test-register-button"
            cy-test="cy-test-register-button"
          >
            Reigster
          </Button>
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Box component={"span"}>Already have an account? </Box>
            <Box component={"span"} sx={{ textDecoration: "none" }}>
              <StyledLink to={"/login"}>Login.</StyledLink>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            {registerMutation.isLoading && <LinearProgress />}
          </Box>
        </Box>
        <>
          <Snackbar open={open} autoHideDuration={4000} onClose={handleOnClose}>
            <Alert
              onClose={handleOnClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              Email or password are not correct!
            </Alert>
          </Snackbar>
        </>
      </form>
    </Container>
  );
};

export default Register;
