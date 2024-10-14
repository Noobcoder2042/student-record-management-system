// Component/WelcomeScreen.jsx
import React from "react";
import { Box, Typography, Button } from "@mui/material";

// Ensure to adjust the path based on your project's structure
import studentImage from "../assets/student.png"; // Import the image

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
      }}
    >
      <Box
        component="img"
        src={studentImage}
        alt="Student"
        sx={{
          width: { xs: "80%", sm: "60%", md: "40%" }, // Responsive image size
          maxWidth: 200, // Max width for larger screens
          marginBottom: 2, // Space below the image
        }}
      />

      <Typography variant="h3" gutterBottom>
        Welcome to the Student Record Management System
      </Typography>
      <Typography variant="caption" gutterBottom>
        Designed and Developed by Rudra Chandra
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={onProceed}
        sx={{ marginTop: 2 }}
      >
        Proceed
      </Button>
    </Box>
  );
};

export default WelcomeScreen;
