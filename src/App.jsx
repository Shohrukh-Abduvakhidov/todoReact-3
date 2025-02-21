import React, { useState } from "react";
import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Modal,
  Box,
  TextField,
  Checkbox,
  Typography,
  Select,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Margin } from "@mui/icons-material";

function App() {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: false },
  ]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({ name: "", email: "" });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleOpen = (user = null) => {
    setEditMode(!!user);
    setSelectedUser(user);
    setNewUser(
      user ? { name: user.name, email: user.email } : { name: "", email: "" }
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSave = () => {
    if (editMode) {
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, ...newUser } : user
        )
      );
    } else {
      setUsers([...users, { id: Date.now(), ...newUser, status: false }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleStatusChange = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  };

  const filteredUsers = users
    .filter((user) =>
      JSON.stringify(user).toLowerCase().includes(search.toLowerCase())
    )
    .filter((user) =>
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? user.status
        : !user.status
    );

  return (
    <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Button
          variant="contained"
          style={{ margin: "20px" }}
          sx={{
            width : {xs : "100px" ,md : "150px"},
            mr : {xs : "100px" , md : "0px"}
          }}
          color="primary"
          onClick={() => handleOpen()}
        >
          Add User
        </Button>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
          style={{ marginTop: 10, width: 300, marginRight: "20px" }}
        />
        <Select
          value={statusFilter}
          onChange={handleStatusFilterChange}
          sx={{width : 100}}
          style={{ marginTop: 10}}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </Select>
      </Container>
      <TableContainer sx={{width : {xs : "100%" , md: "100%"}}} component={Paper} style={{ marginTop: 20 }}>
        <Table sx={{width : {xs : "100%"}}}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.length === 0 ? (
              <Typography
                style={{
                  color: "red",
                  textAlign: "center",
                  margin: "0px 20px",
                  position: "absolute",
                  left: "28%",
                }}
                variant="h1"
              >
                NOT FOUND
              </Typography>
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell> 
            <Button 
              sx={{ 
                p: "5px", 
                width: "70px", 
                height: "30px", 
                bgcolor: user?.status ? "green" : "red", 
                color : "#fff"
              }}>
            {user.status ? "Active" : "Inactive"}
          </Button>
        </TableCell>

                  <TableCell sx={{
                    display : "flex",
                  }}>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpen(user)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(user.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton>
                    <Checkbox
                        checked={user.status}
                        onChange={() => handleStatusChange(user.id)}
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {editMode ? "Edit User" : "Add User"}
          </Typography>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={newUser.name}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            style={{ marginBottom: 10 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            fullWidth
          >
            {editMode ? "Save Changes" : "Add User"}
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

export default App;
