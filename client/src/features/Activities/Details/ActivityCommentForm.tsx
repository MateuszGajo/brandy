import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ICreateComment } from "app/models/Comment";
import { useActivityStore } from "app/provider/RootStoreProvider";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";

const commentSchema = yup.object({
  comment: yup.string().required("Uzupełnij to pole"),
});

const ActivityCommentForm = () => {
  const params = useParams();
  const id = params["id"] || "";

  const { addComment } = useActivityStore();

  const handleSubmit = (values: ICreateComment) => {
    addComment(values, id);
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: commentSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Box
      component="form"
      sx={{
        background: "white",
        padding: 1,
      }}
      onSubmit={formik.handleSubmit}
    >
      <TextField variant="outlined" fullWidth placeholder="Napisz komentarz" />
      <Button variant="outlined" sx={{ mt: 1 }}>
        Wyślij
      </Button>
    </Box>
  );
};

export default ActivityCommentForm;
