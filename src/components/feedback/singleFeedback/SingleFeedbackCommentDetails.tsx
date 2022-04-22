import { useQuery, useMutation, useQueryClient } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Snackbar,
  DialogTitle,
  SwipeableDrawer,
  Slide,
  FormControl,
  TextField,
} from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState, Fragment } from "react";

import queries from "../../../api/queries";
import mutation from "../../../api/mutations";
import { format } from "date-fns";
import { StyledErrorMessage } from "./SingleFeedbackStyle";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SingleFeedbackCommentDetails = () => {
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

  function onSubmit(values: FieldValues) {
    const updateFeedbackData = {
      userId: Number(data?.data.userId),
      reporterId: Number(data?.data.reporterId),
      content: values.content,
      updatedAt: new Date(),
      createdAt: data?.data.createdAt,
      id: data?.data.id,
    };
    updateFeedback.mutate(updateFeedbackData);
    setDrawerOpen({ ...drawerOpen, right: false });
  }

  const updateFeedback = useMutation(mutation.updateFeedback, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("feedback-details");
    },
  });
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
              placeholder="Write feedback here..."
              size="medium"
              {...register("content", {
                required: "Feedback is required field!",
                minLength: {
                  value: 4,
                  message: "Feedback must have at least four characters.",
                },
              })}
            />
            {errors.content && (
              <StyledErrorMessage sx={{ fontSize: 12, mb: 2 }}>
                {errors.content.message}
              </StyledErrorMessage>
            )}
          </FormControl>
          <Button type="submit" variant="contained">
            Update feedback.
          </Button>
        </Box>
      </form>
    </Box>
  );

  const navigation = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const params = useParams();
  const userId = window.localStorage.getItem("userId");

  const [open, setOpen] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const deleteFeedbackMutation = useMutation(mutation.deleteFeedback, {
    onSuccess: (data) => {
      setOpenAlert(true);
      setTimeout(() => navigation("/newest"), 1000);
    },
    onError: (data) => {
      setOpenAlert(false);
    },
  });

  function deleteFeedback() {
    deleteFeedbackMutation.mutate(Number(data?.data.id));
    setOpen(false);
    setOpenAlert(true);
  }

  function handleOnCloseAlert() {
    setOpenAlert(false);
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
      {Number(userId) === Number(data?.data.reporterId) && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Fragment key={"right"}>
            <Button variant="contained" onClick={toggleDrawer("right", true)}>
              Edit
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
          <Button
            size="small"
            color="error"
            variant="contained"
            onClick={handleClickOpen}
          >
            Delete
          </Button>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle>{"Delete feedback?"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                Are you sure that you want to delete this feedback?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={deleteFeedback}>Delete</Button>
            </DialogActions>
          </Dialog>
          <>
            <Snackbar
              open={openAlert}
              autoHideDuration={4000}
              onClose={handleOnCloseAlert}
            >
              <Alert
                onClose={handleOnCloseAlert}
                severity="success"
                sx={{ width: "100%" }}
              >
                You've deleted feedback!
              </Alert>
            </Snackbar>
          </>
        </Box>
      )}
    </Container>
  );
};

export default SingleFeedbackCommentDetails;
