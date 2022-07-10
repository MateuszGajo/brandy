import React from "react";
import {
  Grid,
  Avatar,
  Typography,
  TextField,
  Container,
  Box,
  CssBaseline,
  FormHelperText,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./styles/SigninForm.style";
import { useAuthenticationStore } from "app/provider/RootStoreProvider";
import { ICreds } from "app/models/Authentication";
import { observer } from "mobx-react-lite";

const schema = yup.object({
  email: yup.string().required("Wpisz email").email("Wpisz poprawny email"),
  password: yup
    .string()
    .required("Wpisz hasło")
    .min(8, "Hasło musi zawierać min. 8 znaków"),
});

const SigninForm: React.FC = () => {
  const { login, loginError, isSubmitting } = useAuthenticationStore();

  const handleSubmit = (values: ICreds) => {
    login(values);
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
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            {loginError ? (
              <FormHelperText margin="dense" error>
                {loginError}
              </FormHelperText>
            ) : null}

            <LoadingButton
              variant="contained"
              type="submit"
              fullWidth
              size="large"
              data-testid="signin-submit-button"
              loading={isSubmitting}
              disabled={!(formik.isValid && formik.dirty)}
            >
              Zaloguj
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </Grid>
  );
};

export default observer(SigninForm);
