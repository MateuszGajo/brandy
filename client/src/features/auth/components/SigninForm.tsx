import React from "react";
import {
  Grid,
  Avatar,
  Typography,
  TextField,
  Container,
  Button,
  Box,
  CssBaseline,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./styles/SigninForm.style";

const schema = yup.object({
  email: yup.string().required("Wpisz email").email("Wpisz poprawny email"),
  password: yup
    .string()
    .required("Wpisz hasło")
    .min(8, "Hasło musi zawierać min. 8 znaków"),
});

interface IMyFormValues {
  email: string;
  password: string;
}

const SigninForm: React.FC = () => {
  const handleSubmit = (values: IMyFormValues) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: handleSubmit,
  });

  return (
    <Grid alignItems="center">
      <Container component="main">
        <CssBaseline />
        <Box sx={styles.contentWrapper}>
          <Avatar sx={styles.avatar}>
            <LockIcon sx={styles.icon} />
          </Avatar>
          <Typography variant="h4" component="h2">
            Zaloguj się
          </Typography>
          <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && !!formik.errors.email}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Hasło"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <Button
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              data-testid="signin-submit-button"
              // primary
              // disabled={!(formik.isValid && formik.dirty)}
            >
              Zaloguj
            </Button>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default SigninForm;
