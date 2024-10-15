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
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import SearchAndFilter from "./SearchAndFilter";
import StudentForm from "./StudentForm";
import StudentTable from "./StudentTable";
import StudentFilter from "./StudentFilter";
import AddIcon from "@mui/icons-material/Add";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as MUIChartTooltip,
} from "recharts";

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

const cardStyle = {
  bgcolor: "transparent",
  borderRadius: 4,
  border: "1px solid transparent",
  background: "linear-gradient(45deg, #2196F3, #21CBF3)", 
  backgroundClip: "padding-box",
  position: "relative",
  transition: "0.3s ease", 

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: "8px",
    background: "linear-gradient(45deg, #ff9800, #ff5722)", 
    zIndex: -1,
    filter: "blur(8px)", 
    boxShadow: "0 0 0 rgba(255, 152, 0, 0)", 
    transition: "0.3s ease", 
  },

  "&:hover::before": {
    boxShadow: "0 0 20px rgba(255, 152, 0, 0.7)",
  },

  "&:hover": {
    boxShadow: "0 0 20px rgba(33, 150, 243, 0.5)", 
  },
};

const Dashboard = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState(""); 
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);

  // Fetch students from localStorage or use demo data
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];

    if (storedStudents.length === 0) {
      const demoData = [
        { id: 7528973001174, name: "Rohit Sharma", age: 22, grade: "A", isActive: true },
        { id: 1828773042244, name: "Payel Roy", age: 19, grade: "B", isActive: false },
        { id: 4428973022276, name: "Suresh Kumar", age: 25, grade: "C", isActive: true },
      ];
      localStorage.setItem("students", JSON.stringify(demoData));
      setStudents(demoData);
      setFilteredStudents(demoData);
    } else {
      setStudents(storedStudents);
      setFilteredStudents(storedStudents);
    }
  }, []);

  useEffect(() => {
    handleSearchAndFilter(); 
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

  // Data for Pie Chart
  const statusData = [
    { name: "Active", value: students.filter((s) => s.isActive).length },
    { name: "Inactive", value: students.filter((s) => !s.isActive).length },
  ];

  // Data for Bar Chart (Age Groups)
  const ageGroups = [
    { ageGroup: "0-10", count: students.filter((s) => s.age <= 10).length },
    {
      ageGroup: "11-20",
      count: students.filter((s) => s.age > 10 && s.age <= 20).length,
    },
    {
      ageGroup: "21-30",
      count: students.filter((s) => s.age > 20 && s.age <= 30).length,
    },
    { ageGroup: "31+", count: students.filter((s) => s.age > 30).length },
  ];

  // Data for Grade Distribution Chart
  const getGradeDistribution = () => {
    const gradeCounts = {};
    students.forEach((student) => {
      if (gradeCounts[student.grade]) {
        gradeCounts[student.grade]++;
      } else {
        gradeCounts[student.grade] = 1;
      }
    });
    return Object.entries(gradeCounts).map(([grade, count]) => ({
      grade,
      count,
    }));
  };

  const gradeDistribution = getGradeDistribution();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" mt={2} gutterBottom>
          Student Record Management System
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography variant="h6">Total Students</Typography>
                <Typography variant="h3">{students.length}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
              <CardContent>
                <Typography variant="h6">Active Students</Typography>
                <Typography variant="h3">
                  {students.filter((student) => student.isActive).length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={cardStyle}>
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
            filter={statusFilter} 
            setFilter={setStatusFilter} 
          />

          {/* Search and Filter component */}
          <Box sx={{ minWidth: "20%", display: "flex", justifyContent: "end" }}>
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

        <Container sx={{ marginTop: 3 }}>
          <Typography variant="h5" mt={5} gutterBottom align="center">
            Student Record Overview
          </Typography>

          {/* Charts Section */}
          <Grid
            container
            spacing={2}
            mt={2}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Grid item xs={12} md={4}>
              <BarChart width={300} height={300} data={ageGroups}>
                <XAxis dataKey="ageGroup" />
                <YAxis />
                <Bar dataKey="count" fill="#8884d8" />
                <MUIChartTooltip />
              </BarChart>
              <Typography align="center">Age Groups</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <PieChart width={300} height={300}>
                <Pie
                  data={statusData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? "#82ca9d" : "#ff8042"}
                    />
                  ))}
                </Pie>
                <MUIChartTooltip />
              </PieChart>
              <Typography align="center">Status Distribution</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <BarChart width={300} height={300} data={gradeDistribution}>
                <XAxis dataKey="grade" />
                <YAxis />
                <Bar dataKey="count" fill="#8884d8" />
                <MUIChartTooltip />
              </BarChart>
              <Typography align="center">Grade Distribution</Typography>
            </Grid>
          </Grid>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
