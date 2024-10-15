import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Checkbox,
  MenuItem,
  FormControlLabel,
  Box,
} from "@mui/material";

const StudentForm = ({ addStudent, currentStudent }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("A");
  const [isActive, setIsActive] = useState(true);

  // Validation states
  const [nameError, setNameError] = useState(false);
  const [nameErrorMsg, setNameErrorMsg] = useState("");
  const [ageError, setAgeError] = useState(false);

  useEffect(() => {
    if (currentStudent) {
      setName(currentStudent.name);
      setAge(currentStudent.age);
      setGrade(currentStudent.grade);
      setIsActive(currentStudent.isActive);
    }
  }, [currentStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate name field to allow only letters and spaces
    const nameRegex = /^[A-Za-z\s]+$/;
    if (name.trim() === "") {
      setNameError(true);
      setNameErrorMsg("Name is required");
      return;
    } else if (!nameRegex.test(name)) {
      setNameError(true);
      setNameErrorMsg("Name can only contain letters");
      return;
    } else {
      setNameError(false);
      setNameErrorMsg("");
    }

    // Validate age between 5 and 100
    if (!age || age < 5 || age > 100) {
      setAgeError(true);
      return;
    } else {
      setAgeError(false);
    }

    const newStudent = {
      id: currentStudent ? currentStudent.id : Date.now(),
      name,
      age,
      grade,
      isActive,
    };
    addStudent(newStudent);

    // Reset fields
    setName("");
    setAge("");
    setGrade("A");
    setIsActive(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        fullWidth
        margin="normal"
        error={nameError}
        helperText={nameError ? nameErrorMsg : ""}
      />
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        fullWidth
        margin="normal"
        error={ageError}
        helperText={ageError ? "Age must be between 5 and 100" : ""}
      />
      <TextField
        label="Grade"
        select
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        fullWidth
        margin="normal"
      >
        {["A", "B", "C", "D", "F"].map((grade) => (
          <MenuItem key={grade} value={grade}>
            {grade}
          </MenuItem>
        ))}
      </TextField>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={isActive}
              onChange={() => setIsActive(!isActive)}
            />
          }
          label="Enrollment Active"
        />
        <Button type="submit" variant="contained" color="primary">
          {currentStudent ? "Update Student" : "Add Student"}
        </Button>
      </Box>
    </form>
  );
};

export default StudentForm;
