import {
  Box,
  Button,
  Container,
  Input,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const ActivityForm = () => {
  const [isDragOver, setDragOver] = useState(false);
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
        >
          <TextField fullWidth />
          <Box>
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
              />
            </Box>
          </Box>
          <Button
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
