import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Checkbox,
  MenuItem,
  FormControlLabel,
} from "@mui/material";

const StudentForm = ({ addStudent, currentStudent }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("A");
  const [isActive, setIsActive] = useState(true);

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
    const newStudent = {
      id: currentStudent ? currentStudent.id : Date.now(), // Use currentStudent id if editing
      name,
      age,
      grade,
      isActive,
    };
    addStudent(newStudent);
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
      />
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
        fullWidth
        margin="normal"
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
    </form>
  );
};

export default StudentForm;
