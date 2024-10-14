import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit"; // Edit icon
import DeleteIcon from "@mui/icons-material/Delete"; // Delete icon
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"; // Up arrow icon
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"; // Down arrow icon

const StudentTable = ({ students, editStudent, deleteStudent }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "name",
    direction: "ascending",
  });

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setStudentToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete.id);
    }
    handleCloseDialog();
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedStudents = [...students].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <Paper elevation={3} sx={{ borderRadius: "8px", overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow>
            {["id", "name", "age", "grade"].map((header) => (
              <TableCell
                key={header}
                style={{
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                  fontWeight: "bold",
                  cursor: "pointer", // Add pointer cursor for sort indication
                }}
                onClick={() => requestSort(header)}
              >
                {header.charAt(0).toUpperCase() + header.slice(1)}{" "}
                {/* Capitalize header */}
                {sortConfig.key === header &&
                  (sortConfig.direction === "ascending" ? (
                    <ArrowUpwardIcon
                      fontSize="small"
                      sx={{ marginLeft: "8px", verticalAlign: "middle" }}
                    />
                  ) : (
                    <ArrowDownwardIcon
                      fontSize="small"
                      sx={{ marginLeft: "8px", verticalAlign: "middle" }}
                    />
                  ))}
              </TableCell>
            ))}
            <TableCell
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Status
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedStudents.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <Tooltip title="Edit Student" arrow>
                  <IconButton
                    color="success"
                    onClick={() => editStudent(student)}
                    sx={{ marginRight: "8px" }}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Student" arrow>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(student)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Confirmation Dialog for Delete */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the student{" "}
            <strong>{studentToDelete?.name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default StudentTable;
