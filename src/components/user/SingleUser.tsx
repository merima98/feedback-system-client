import {
  Container,
  Box,
  Button,
  FormControl,
  TextField,
  SwipeableDrawer,
} from "@mui/material";
import { Fragment, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import { useMutation } from "react-query";

import queries from "../../api/queries";
import mutations from "../../api/mutations";
import { StyledErrorMessage } from "./SingleUserStyle";

const SingleUser = () => {
  const [drawerOpen, setDrawerOpen] = useState({
    right: false,
  });

  const queryClient = useQueryClient();

  const toggleDrawer =
    (anchor: string, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event && (event as React.KeyboardEvent).key === "Shift") {
        return;
      }

      setDrawerOpen({ ...drawerOpen, [anchor]: open });
    };

  const updateUserProfile = useMutation(mutations.updateUserProfile, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("single-user");
    },
  });

  function onSubmit(values: FieldValues) {
    const updateUserdata = {
      firstName: values.firstName,
      lastName: values.lastName,
      email: data?.data.email,
      password: data?.data.password,
      role: values.role,
      id: data?.data.id,
    };
    updateUserProfile.mutate(updateUserdata);
    setDrawerOpen({ ...drawerOpen, right: false });
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const list = () => (
    <Box
      role="presentation"
      sx={{
        p: 5,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
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
            Update your feedback
          </Box>
          <FormControl>
            <TextField
              sx={{
                mb: 2,
              }}
              label="First name"
              cy-test="cy-test-edit-user-profile-firstName"
              size="small"
              defaultValue={data?.data.firstName}
              {...register("firstName", {
                required: "First name is required field",
                minLength: {
                  value: 2,
                  message: "First name must have at least two characters!",
                },
              })}
            />
            {errors.content && (
              <StyledErrorMessage>{errors.content.message}</StyledErrorMessage>
            )}
          </FormControl>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              defaultValue={data?.data.lastName}
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
              label="Your role"
              size="medium"
              defaultValue={data?.data.role}
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
            type="submit"
            variant="contained"
            cy-test="cy-test-edit-user-profile-update-button"
          >
            Update your profile
          </Button>
        </Box>
      </form>
    </Box>
  );

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
          mb: 2,
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
      <Box>
        <Fragment key={"right"}>
          <Button
            variant="contained"
            cy-test="cy-test-edit-profile-button"
            size="small"
            onClick={toggleDrawer("right", true)}
          >
            Edit profile
          </Button>
          <SwipeableDrawer
            anchor="right"
            open={drawerOpen["right"]}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
          >
            {list()}
          </SwipeableDrawer>
        </Fragment>
      </Box>
    </Container>
  );
};

export default SingleUser;
