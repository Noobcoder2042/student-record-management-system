import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

import studentImage from "../assets/student.png";

const ProceedButton = styled(Button)({
  backgroundColor: "#00C49F",
  color: "#fff",
  "&:hover": {
    backgroundColor: "#009688",
  },
  padding: "10px 20px",
  borderRadius: "30px",
  fontSize: "1.2rem",
});

const WelcomeScreen = ({ onProceed }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#121212",
        color: "#fff",
        padding: 3,
      }}
    >
      <Box
        component="img"
        src={studentImage}
        alt="Student"
        sx={{
          width: { xs: "80%", sm: "50%", md: "35%" },
          maxWidth: 250,
          marginBottom: 3,
          transition: "transform 0.5s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        }}
      />

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
        }}
      >
        Welcome to the Student Record System
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" },
          marginBottom: 4,
          color: "rgba(255, 255, 255, 0.7)",
        }}
      >
        Designed and Developed by <strong>Rudra Chandra</strong>
      </Typography>

      <ProceedButton
        variant="contained"
        onClick={onProceed}
        sx={{
          marginTop: 3,
          transition: "all 0.3s ease",
        }}
      >
        Get Started
      </ProceedButton>
    </Box>
  );
};

export default WelcomeScreen;
