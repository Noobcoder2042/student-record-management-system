import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Modal,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import SearchAndFilter from "./SearchAndFilter"; // Keep the SearchAndFilter component
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import StudentFilter from "./StudentFilter"; // Import the StudentFilter component
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#90caf9",
    },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
});

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); // State for the status filter
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setStudents(storedStudents);
    setFilteredStudents(storedStudents);
  }, []);

  useEffect(() => {
    handleSearchAndFilter(); // Call search and filter whenever dependencies change
  }, [students, searchQuery, statusFilter]);

  const addStudent = (student) => {
    setStudents((prevStudents) => {
      const newStudents = [...prevStudents, student];
      localStorage.setItem("students", JSON.stringify(newStudents));
      return newStudents;
    });
    setOpen(false);
    setCurrentStudent(null);
  };

  const editStudent = (updatedStudent) => {
    const updatedList = students.map((student) =>
      student.id === updatedStudent.id ? updatedStudent : student
    );

    setStudents(updatedList);
    localStorage.setItem("students", JSON.stringify(updatedList));
    setOpen(false);
    setCurrentStudent(null);
  };

  const deleteStudent = (id) => {
    setStudents((prevStudents) => {
      const updatedList = prevStudents.filter((student) => student.id !== id);
      localStorage.setItem("students", JSON.stringify(updatedList));
      return updatedList;
    });
  };

  const handleSearchAndFilter = () => {
    let filteredList = students;

    // Search functionality
    if (searchQuery) {
      filteredList = filteredList.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Status filter functionality
    if (statusFilter) {
      filteredList = filteredList.filter(
        (student) =>
          (statusFilter === "active" && student.isActive) ||
          (statusFilter === "inactive" && !student.isActive)
      );
    }

    setFilteredStudents(filteredList);
  };

  const openEditModal = (student) => {
    setCurrentStudent(student);
    setOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h5" mt={2} gutterBottom>
          Student Record Management System
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Students</Typography>
                <Typography variant="h3">{students.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Active Students</Typography>
                <Typography variant="h3">
                  {students.filter((student) => student.isActive).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Inactive Students</Typography>
                <Typography variant="h3">
                  {students.filter((student) => !student.isActive).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBlock: 2,
          }}
        >
          {/* Student Status Filter component */}
          <StudentFilter
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
          />
          {/* Search and Filter component */}
          <Box>
            <SearchAndFilter
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <Tooltip title="Add Student">
              <IconButton
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
                sx={{
                  color: "yellow",
                }}
              >
                <AddIcon sx={{ fontSize: "2rem" }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Modal open={open} onClose={() => setOpen(false)}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              p: 4,
              borderRadius: 2,
            }}
          >
            <StudentForm
              addStudent={currentStudent ? editStudent : addStudent}
              currentStudent={currentStudent}
            />
          </Box>
        </Modal>

        <StudentTable
          students={filteredStudents}
          editStudent={openEditModal}
          deleteStudent={deleteStudent}
        />
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
