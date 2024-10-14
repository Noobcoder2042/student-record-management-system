import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";

// Ensure to adjust the path based on your project's structure
import studentImage from "../assets/student.png"; // Import the image

const ProceedButton = styled(Button)({
  backgroundColor: "#00C49F", // Custom color for the button
  color: "#fff",
  "&:hover": {
    backgroundColor: "#009688", // Slightly darker on hover
  },
  padding: "10px 20px", // Increased padding for a larger button
  borderRadius: "30px", // Rounded corners
  fontSize: "1.2rem", // Larger font size for better readability
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
        backgroundColor: "#121212", // Dark mode background
        color: "#fff", // Light text for contrast
        padding: 3, // Add some padding around the content
      }}
    >
      <Box
        component="img"
        src={studentImage}
        alt="Student"
        sx={{
          width: { xs: "80%", sm: "50%", md: "35%" }, // Responsive image size
          maxWidth: 250, // Max width for larger screens
          marginBottom: 3, // Space below the image
          transition: "transform 0.5s ease", // Smooth scaling effect on hover
          "&:hover": {
            transform: "scale(1.05)", // Scale up slightly on hover
          },
        }}
      />

      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: "bold", // Bolder heading
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive text size
        }}
      >
        Welcome to the Student Record System
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.2rem" }, // Responsive text size
          marginBottom: 4, // Increased space below the subheading
          color: "rgba(255, 255, 255, 0.7)", // Slightly muted text color
        }}
      >
        Designed and Developed by <strong>Rudra Chandra</strong>
      </Typography>

      <ProceedButton
        variant="contained"
        onClick={onProceed}
        sx={{
          marginTop: 3, // Increased space above the button
          transition: "all 0.3s ease", // Smooth transition for hover effects
        }}
      >
        Get Started
      </ProceedButton>
    </Box>
  );
};

export default WelcomeScreen;
