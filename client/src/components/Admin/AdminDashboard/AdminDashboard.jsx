import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { Button, Container, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import swal from "sweetalert";
import LinearProgress from "@mui/material/LinearProgress";
import { AllUsersApi, EditUserApi, DeleteUserApi } from "../../../api/index";

export default function AdminDashboards() {
  
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClickOpen = (index) => {
    setLoading(true);
    const result = data[index];
    setEdit(result);
    setOpen(true);
  };

  const handleClose = () => {
    setLoading(false);
    setOpen(false);
  };

  const userData = () =>{
    AllUsersApi().then((data) => {
      setData(data.data);
    });
  }
 
  useEffect(() => {
     userData()
  }, []);

  const handleSubmit = (event, value) => {
    event.preventDefault();
    setLoading(true);
    EditUserApi(value, edit._id)
      .then((response) => {
        toast.success("Successfully Updated!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setOpen(false);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  };

  const userDelete = (id) => {
    setLoading(true);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this user",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        DeleteUserApi({ obj: id })
          .then((response) => {
            swal("Poof! user has been deleted!", {
              icon: "success",
            });
            userData()
            setLoading(false);
          })
          .catch((error) => {
            alert(error);
          });
        setLoading(false);
      } else {
        swal("User is safe!");
        setLoading(false);
      }
    });
  };

  return (
    <>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Button
        variant="contained"
        size="medium"
        sx={{
          boxShadow: "none",
          marginTop: 3,
          marginX: { xs: 5, sm: 10, md: 25 },
          borderRadius: 1,
        }}
        startIcon={<AddIcon />}
      >
        ADD USER
      </Button>

      <TableContainer>
        <Container>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Table sx={{ marginTop: 3 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>EMAIL</TableCell>
                <TableCell>USERNAME</TableCell>
                <TableCell>DATE</TableCell>
                <TableCell>EDIT</TableCell>
                <TableCell>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((result, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {result.email}
                    </TableCell>
                    <TableCell>
                      {result.firstName + " " + result.lastName}
                    </TableCell>
                    <TableCell>
                      {moment(result.createdAt).format("MM/DD/YYYY")}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => {
                          handleClickOpen(index);
                        }}
                        startIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                      <Dialog fullWidth open={open} onClose={handleClose}>
                        <DialogTitle>EDIT USER</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            You can set my maximum width and whether to adapt or
                            not.
                          </DialogContentText>
                          <Formik
                            initialValues={{
                              email: "",
                            }}
                            validationSchema={Yup.object().shape({
                              email: Yup.string()
                                .email("Email must be valid")
                                .required("Email is required")
                                .max(255),
                            })}
                          >
                            {({
                              handleChange,
                              errors,
                              values,
                              touched,
                              handleBlur,
                            }) => (
                              <Box
                                component="form"
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                  m: "auto",
                                  width: "fit-content",
                                }}
                                onSubmit={(e) => handleSubmit(e, values)}
                              >
                                <FormControl sx={{ mt: 2, minWidth: 150 }}>
                                  <TextField
                                    error={Boolean(
                                      touched.email && errors.email
                                    )}
                                    sx={{ width: 450 }}
                                    helperText={touched.email && errors.email}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    margin="normal"
                                    id="outlined-basic"
                                    label="Email"
                                    name="email"
                                    variant="outlined"
                                    defaultValue={edit.email}
                                  />
                                  <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{ mt: 2, minWidth: 120 }}
                                    disabled={Boolean(
                                      errors.email || values.email === ""
                                    )}
                                  >
                                    Submit
                                  </Button>
                                </FormControl>
                              </Box>
                            )}
                          </Formik>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Close</Button>
                        </DialogActions>
                      </Dialog>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => {
                          userDelete(result._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Container>
      </TableContainer>
    </>
  );
}
