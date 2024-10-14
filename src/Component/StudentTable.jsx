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

const StudentTable = ({ students, editStudent, deleteStudent }) => {
  const [openDialog, setOpenDialog] = useState(false); // State to control the dialog visibility
  const [studentToDelete, setStudentToDelete] = useState(null); // State to store the student to be deleted

  const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setOpenDialog(true); // Open dialog when delete button is clicked
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Close the dialog
    setStudentToDelete(null); // Clear the student to delete
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      deleteStudent(studentToDelete.id); // Call delete function with the student's ID
    }
    handleCloseDialog(); // Close the dialog after deletion
  };

  return (
    <Paper elevation={3} sx={{ borderRadius: "8px", overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              ID
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Name
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Age
            </TableCell>
            <TableCell
              style={{
                backgroundColor: "#1e1e1e",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              Grade
            </TableCell>
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
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.id}</TableCell>
              <TableCell>{student.name}</TableCell>
              <TableCell>{student.age}</TableCell>
              <TableCell>{student.grade}</TableCell>
              <TableCell>{student.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell>
                <Tooltip title="Edit Student" arrow>
                  <IconButton
                    color="success" // Use 'success' for green color
                    onClick={() => editStudent(student)}
                    sx={{ marginRight: "8px" }} // Add margin between buttons
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete Student" arrow>
                  <IconButton
                    color="error" // Use 'error' for red color
                    onClick={() => handleDeleteClick(student)} // Open dialog on delete
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
