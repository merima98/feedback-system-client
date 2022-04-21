import { Box, Button, FormControl, TextField } from "@mui/material";
import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { StyledErrorMessage } from "./NewFeedbackFormStyle";
import mutations from "../../../api/mutations";

const NewFeedbackForm = (props: { reporterId: number; userId: number }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const newFeedbackMutation = useMutation(mutations.addNewFeedback, {
    onSuccess: (data) => {
      console.log("This is data on success, ", data);
    },
    onError: (data) => {
      console.log("This is data on error ", data);
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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <FormControl>
            <TextField
              sx={{ mb: 2 }}
              {...register("content", {
                required: "Feedback is required!",
                minLength: {
                  value: 4,
                  message: "Feetback must have at least gour characters.",
                },
              })}
              placeholder="Write feedback here..."
              size="medium"
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
    </Box>
  );
};

export default NewFeedbackForm;
