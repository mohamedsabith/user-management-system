import React,{useEffect,useState} from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";
import swal from "sweetalert";
import {AdminLoginApi} from '../../../api/index'


const theme = createTheme();

export default function AdminLogin() {

  const Navigate = useNavigate();

  useEffect(()=>{
   const adminAuth = localStorage.getItem("AdminToken")
   if(adminAuth){
    Navigate("/admin/dashboard")
   }
  },[Navigate])

  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event,values) => {
    event.preventDefault();
    setLoading(true)
    AdminLoginApi(values).then((response)=>{
      setError(response.data.error);
      if(response.data.status){
        swal("Login success!", "You clicked the button!", "success");
        localStorage.setItem("AdminToken", response.data.token);
        setLoading(false);
       Navigate("/admin/dashboard")
      }
      setLoading(false)
    }).catch((error)=>{
      swal("Oops!", "Something went wrong", "error").then(() => {
        Navigate("/admin");
      });
    })
  };

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
            marginTop: 15,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{fontWeight:"900"}}>
            ADMIN LOGIN
          </Typography>
          <Typography color="error" gutterBottom variant="body1">
            {error}
          </Typography>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Email must be valid")
                .required("Email is required")
                .max(255),
              password: Yup.string()
                .required("Password is required")
                .max(255)
            })}
          >
          {({ handleChange, values, errors, touched, handleBlur }) => (
          <Box
            component="form"
            onSubmit={(e)=>handleSubmit(e,values)}
            sx={{ mt: 1 }}
          >
            <TextField
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              color="secondary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Boolean(
                errors.password ||
                  values.password === "" ||
                  errors.email ||
                  values.email === ""
              )}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link variant="body2" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
          )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
