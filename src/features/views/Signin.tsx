import React from "react";
import {
  Grid,
  Avatar,
  Paper,
  Typography,
  TextField,
  Container,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useFormik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().required("Wpisz email").email("Wpisz poprawny email"),
  password: yup
    .string()
    .required("Wpisz hasło")
    .min(8, "Hasło musi zawierac 8 znaków"),
});

interface IMyFormValues {
  email: string;
  password: string;
}

const Signin: React.FC = () => {
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
    <Paper>
      <Grid alignItems="center">
        <Container>
          <Avatar>
            <LockIcon />
          </Avatar>
          <Typography variant="h2">Zaloguj się</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={5} direction="column">
              <Grid item>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && !!formik.errors.email}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item>
                <TextField
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
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  type="submit"
                  fullWidth
                  data-testid="signin-submit-button"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Zaloguj
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Grid>
    </Paper>
  );
};

export default Signin;
