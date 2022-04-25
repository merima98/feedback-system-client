import {
  Box,
  Button,
  FormControl,
  Snackbar,
  TextareaAutosize,
} from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { forwardRef, useState } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { StyledErrorMessage } from "./NewFeedbackFormStyle";
import mutations from "../../../api/mutations";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const NewFeedbackForm = (props: { reporterId: number; userId: number }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleOnClose = () => {
    setOpen(false);
  };

  const newFeedbackMutation = useMutation(mutations.addNewFeedback, {
    onSuccess: (data) => {
      setOpen(true);
      reset();
      queryClient.invalidateQueries("single-feedback");
    },
    onError: (data) => {
      setOpen(false);
    },
  });

  function onSubmit(values: FieldValues) {
    const newFeedbackData = {
      userId: Number(props.userId),
      reporterId: Number(props.reporterId),
      content: values.content,
      updatedAt: new Date(),
      createdAt: new Date(),
    };
    newFeedbackMutation.mutate(newFeedbackData);
  }

  return (
    <Box sx={{ mb: 2 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl>
            <TextareaAutosize
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                resize: "none",

                fontFamily: "sans-serif",
              }}
              {...register("content", {
                required: "Feedback is required!",
                minLength: {
                  value: 4,
                  message: "Feedback must have at least four characters.",
                },
              })}
              placeholder="Write feedback here..."
            />
            {errors.content && (
              <StyledErrorMessage sx={{ fontSize: 12, mb: 2 }}>
                {errors.content.message}
              </StyledErrorMessage>
            )}
          </FormControl>
          <Button type="submit">Leave a feedback</Button>
        </Box>
      </form>
      <>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleOnClose}>
          <Alert
            onClose={handleOnClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            You've added feedback.
          </Alert>
        </Snackbar>
      </>
    </Box>
  );
};

export default NewFeedbackForm;
