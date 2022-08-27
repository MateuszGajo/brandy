import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { ICreateActivity } from "app/models/Activity";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import { useActivityStore } from "app/provider/RootStoreProvider";
import { useNavigate } from "react-router-dom";

const IMAGE_FILE_FORMATS_LIST = [
  "image/jpg",
  "image/png",
  "image/jpeg",
  "image/gif",
];

const schema = yup.object({
  image: yup
    .mixed()
    .test(
      "fileFormat",
      "Nieprawidłowe rozserzenie zdjecia, dozwolone: JPG, PNG, GIF",
      (file) => {
        if (file) return IMAGE_FILE_FORMATS_LIST.includes(file.type);
        return true;
      }
    )
    .test("fileSize", "Zdjęcie jest zbyt duże, maxymalnie 2mb", (file) => {
      if (file) return file.size < 2200000;
      return true;
    }),
  text: yup.string().required("To pole jest wymagane"),
});

const ActivityForm = () => {
  const { createActivity } = useActivityStore();

  const navigate = useNavigate();

  const handleSubmit = (values: ICreateActivity) => {
    const formData = new FormData();
    values.image && formData.append("file", values.image);
    formData.append("text", values.text);
    createActivity(formData).then(() => navigate("/"));
  };

  const formik = useFormik({
    onSubmit: handleSubmit,
    initialValues: { text: "", image: undefined },
    validationSchema: schema,
    validateOnChange: true,
  });

  const [isDragOver, setDragOver] = useState(false);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (formik.values.image) setPhoto(formik.values.image);
  }, [formik.values.image]);

  return (
    <Container maxWidth="xl">
      <Typography component="h2" variant="h6">
        Dodaj post
      </Typography>
      <Box sx={{ height: "2px", backgroundColor: "white", mt: 1, mb: 2 }} />
      <Paper elevation={1}>
        <Box
          component="form"
          sx={{ p: 1, display: "flex", flexDirection: "column" }}
          onSubmit={formik.handleSubmit}
        >
          <TextField
            fullWidth
            helperText={formik.errors.text}
            name="text"
            onChange={formik.handleChange}
            value={formik.values.text}
            placeholder="Wpisz tytuł"
            error={!!formik.errors.text}
          />
          <Box>
            {photo && !formik.errors.image ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                position="relative"
              >
                <Button
                  sx={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                  }}
                  onClick={() => {
                    setPhoto(null);
                  }}
                >
                  <CloseIcon />
                </Button>
                <Box
                  component="img"
                  sx={{
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                  src={URL.createObjectURL(photo)}
                />
              </Box>
            ) : (
              <>
                <Box
                  component="label"
                  htmlFor="activity-file-upload"
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    height: "150px",
                    alignItems: "center",
                    border: "1px solid #d1d1d1",
                    borderRadius: 1,
                    mt: 1,
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onDragEnter={() => {
                    console.log("enter");
                    setDragOver(true);
                  }}
                  onDragLeave={() => {
                    console.log("leave");
                    setDragOver(false);
                  }}
                >
                  {isDragOver
                    ? "Upuśc plik tutaj"
                    : "Przeciągnij zdjęcie lub klknij w pole"}
                  <input
                    type="file"
                    id="activity-file-upload"
                    style={{ opacity: 0, position: "absolute", inset: 0 }}
                    name="image"
                    onChange={(event) =>
                      formik.setFieldValue(
                        "image",
                        event.currentTarget.files?.[0]
                      )
                    }
                    // value={formik.values.image}
                  />
                </Box>
                {formik.errors.image ? (
                  <Typography variant="body1" sx={{ color: "red" }}>
                    {formik.errors.image}
                  </Typography>
                ) : null}
              </>
            )}
          </Box>
          <Button
            type="submit"
            variant="outlined"
            sx={{
              marginLeft: "auto",
              mt: 1,
            }}
          >
            Dodaj
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default ActivityForm;
