import { useQuery, useMutation } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
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
  Slide,
} from "@mui/material";

import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { TransitionProps } from "@mui/material/transitions";
import { forwardRef, useState } from "react";

import queries from "../../../api/queries";
import mutation from "../../../api/mutations";
import { format } from "date-fns";

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
  const navigation = useNavigate();
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
      navigation(`/newest`);
    },
    onError: (data) => {
      setOpenAlert(false);
    },
  });

  function deleteFeedback() {
    deleteFeedbackMutation.mutate(Number(data?.data.id));
    setOpen(false);
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
          <Button variant="contained" size="small">
            Edit
          </Button>
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
