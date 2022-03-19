import { Box, Container } from "@mui/material";
import React from "react";
import styles from "./styles/Home.styles";
import Nav from "./Nav/Nav";

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}

const Home: React.FC<IProps> = ({ children }) => {
  return (
    <Box sx={styles.container}>
      <Nav />
      <Container maxWidth="sm">{children}</Container>
    </Box>
  );
};

export default Home;
