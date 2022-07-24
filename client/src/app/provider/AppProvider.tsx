import { Grid, Alert, Button, Box, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, deepPurple } from "@mui/material/colors";
import { useAuthenticationStore } from "./RootStoreProvider";

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: blue[500],
    },
    action: {
      disabledBackground: deepPurple[300],
    },
  },
  typography: {
    fontFamily: ["IBM Plex Sans", "Arial", "sans-serif"].join(","),
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
  const { verify } = useAuthenticationStore();

  useEffect(() => {
    verify();
  }, []);

  return (
    <React.Suspense
      fallback={
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      }
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </React.Suspense>
  );
};

export default AppProvider;
