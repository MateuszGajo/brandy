import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import styles from "./styles/Authentication.styles";
import { NavLink } from "react-router-dom";
import CustomLink from "components/CustomLink/CustomLink";

interface IProps {
  children: React.ReactNode[] | React.ReactNode;
  component?: string;
}

const Authentication: React.FC<IProps> = ({ children, component }) => {
  return (
    <Box sx={styles.wrapper}>
      <Container maxWidth="xs">
        <Paper sx={styles.content}>
          <Paper>
            <Grid container>
              <Grid item xs={12}>
                <Box sx={styles.brandItem}>
                  <Typography
                    variant="h2"
                    component="h1"
                    sx={styles.brandHeading}
                  >
                    Brandy
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Typography component={CustomLink} to="/auth/login">
                  Zaloguj
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography component={CustomLink} to="/auth/register">
                  Zarejstruj
                </Typography>
              </Grid>
            </Grid>
          </Paper>
          <Box sx={styles.child}>{children}</Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Authentication;
