import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ICreateComment } from "app/models/Comment";
import { useCommentStore } from "app/provider/RootStoreProvider";
import { useFormik } from "formik";
import React from "react";
import { useParams } from "react-router-dom";
import * as yup from "yup";

const commentSchema = yup.object({
  text: yup.string().required("Uzupełnij to pole"),
});

const ActivityCommentForm = () => {
  const params = useParams();
  const id = params["id"] || "";

  const { addComment } = useCommentStore();

  const handleSubmit = (values: ICreateComment) => {
    console.log("halo");
    addComment(values, id);
    formik.resetForm();
  };

  const formik = useFormik({
    initialValues: {
      text: "",
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
      <TextField
        variant="outlined"
        fullWidth
        placeholder="Napisz komentarz"
        name="text"
        onChange={formik.handleChange}
        value={formik.values.text}
        error={!!formik.errors.text}
        helperText={formik.errors.text}
      />
      <Button variant="outlined" sx={{ mt: 1 }} type="submit">
        Wyślij
      </Button>
    </Box>
  );
};

export default ActivityCommentForm;
