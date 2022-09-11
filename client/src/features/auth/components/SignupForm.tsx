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
  Button,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as yup from "yup";
import styles from "./styles/SigninForm.style";
import { useAuthenticationStore } from "app/provider/RootStoreProvider";
import { INewUser } from "app/models/Authentication";
import { observer } from "mobx-react-lite";

interface IFormValues extends INewUser {
  confirmPassword: string;
}

const schema = yup.object({
  email: yup.string().required("Wpisz email").email("Wpisz poprawny email"),
  password: yup
    .string()
    .required("Wpisz hasło")
    .min(8, "Hasło musi zawierać min. 8 znaków"),
  confirmPassword: yup
    .string()
    .required("Powtórz hasło")
    .oneOf([yup.ref("password"), null], "Hasła są różne"),
  nick: yup.string().required("Wpisz nick"),
});

const SigninForm: React.FC = () => {
  const { register, registerError, isSubmitting } = useAuthenticationStore();

  const handleSubmit = (values: IFormValues) => {
    const { confirmPassword, ...creds } = values;
    register(creds);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nick: "",
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
            Zarejstruj się
          </Typography>
          <form
            // component="form"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              margin="normal"
              fullWidth
              label="Nazwa"
              name="nick"
              value={formik.values.nick}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nick && !!formik.errors.nick}
              helperText={formik.touched.nick && formik.errors.nick}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onBlur={formik.handleBlur}
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
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Powtórz hasło"
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                !!formik.errors.confirmPassword
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
            {registerError ? (
              <FormHelperText margin="dense" error>
                {registerError}
              </FormHelperText>
            ) : null}

            <Button
              variant="contained"
              type="submit"
              fullWidth
              data-testid="signin-submit-button"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Zarejstruj
            </Button>
          </form>
        </Box>
      </Container>
    </Grid>
  );
};

export default observer(SigninForm);
