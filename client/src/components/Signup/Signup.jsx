import React, { useState,useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LinearProgress from "@mui/material/LinearProgress";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import PasswordStrengthBar from "react-password-strength-bar";
import { SignupUserApi } from "../../api/index";

function Copyright(props) {
  const Navigate = useNavigate();
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" onClick={() => Navigate("/")}>
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(false);
  const Navigate = useNavigate();

  const handleSubmit = (event, values) => {
    event.preventDefault();
    setLoading(true);
    SignupUserApi(values)
      .then((res) => {
        setError(res.data.errorSignup);
        res.data.status &&
          swal(
            "Account created successfully!",
            "You clicked the button!",
            "success"
          );
          console.log(res.data);
        localStorage.setItem("AuthToken", res.data.token);
        Navigate("/login");
        setLoading(false);
      })
      .catch((err) => {
        swal("Oops!", "Something went wrong", "error").then(() => {
          Navigate("/");
        });
      });
  };

  useEffect(() => {
    const Auth=localStorage.getItem("AuthToken")
    if(Auth){
     Navigate("/dashboard")
    }
   }, [Navigate])

  return (
    <ThemeProvider theme={theme}>
      {loading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      )}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: { xs: 8, sm: 8, md: 12 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Typography color="error" gutterBottom variant="body1">
            {error}
          </Typography>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              firstName: Yup.string()
                .required("First Name is required")
                .max(255),
              lastName: Yup.string().required("Last Name is required").max(255),
              email: Yup.string()
                .email("Email must be valid")
                .required("Email is required")
                .max(255),
              password: Yup.string()
                .required("Password is required")
                .max(255)
                .min(11),
            })}
          >
            {({ handleChange, values, errors, touched, handleBlur }) => (
              <Box
                component="form"
                onSubmit={(e) => handleSubmit(e, values)}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      name="firstName"
                      required
                      helperText={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      type="text"
                      id="firstName"
                      label="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      type="text"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      type="email"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      inputMode="email"
                      autoComplete="email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      helperText={touched.password && errors.password}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                    />
                    <PasswordStrengthBar
                      onChangeScore={(score, feedback) => {
                        score === 4 ? setScore(true) : setScore(false);
                      }}
                      password={values.password}
                      minLength={8}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                      <Link underline="hover" color="inherit">
                        Must be at least 11 characters long
                      </Link>
                      <Link underline="hover" color="inherit">
                        Must contain 1 uppercase letter
                      </Link>
                      <Link underline="hover" color="inherit">
                        Must contain number and special character
                      </Link>
                      <Link underline="hover" color="inherit">
                        Cannot end in a number or special character
                      </Link>
                    </Breadcrumbs>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  disabled={Boolean(
                    errors.password ||
                      values.password === "" ||
                      errors.email ||
                      values.email === "" ||
                      errors.firstName ||
                      values.firstName === "" ||
                      errors.lastName ||
                      values.lastName === "" ||
                      score === false
                  )}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link onClick={() => Navigate("/login")} variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
