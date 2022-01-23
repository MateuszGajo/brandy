import { Grid, Alert, Button } from "@mui/material";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, deepPurple } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: blue[500],
    },
  },
});

interface IProps {
  children: React.ReactNode;
}

const Fallback = () => (
  <Grid
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    style={{ minHeight: "100vh" }}
    spacing={2}
  >
    <Grid item>
      <Alert variant="filled" severity="error">
        This is an error alert — check it out!
      </Alert>
    </Grid>
    <Grid item>
      <Button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </Grid>
  </Grid>
);

const AppProvider: React.FC<IProps> = ({ children }) => {
  return (
    <React.Suspense
      fallback={
        // <Box sx={{ display: "flex" }}>
        //   <CircularProgress />
        // </Box>
        <p>fds</p>
      }
    >
      <ErrorBoundary FallbackComponent={Fallback}>
        <ThemeProvider theme={theme}>
          <Router>{children}</Router>
        </ThemeProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};

export default AppProvider;
