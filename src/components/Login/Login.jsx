"use client";
import React from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Paper,
  CssBaseline,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          padding: "10px 20px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
        },
      },
    },
  },
});

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
     const router = useRouter();
  const handleSubmit = async (values, { setSubmitting }) => {
    const response = await axios.post("/api/login", values);
    try {
      if (response.data.success === true) {
        toast.success(response.data.message || "User logged in successfully");
        setSubmitting(false);
        router.push("/dashboard");
      } else {
        toast.error(response.data.message || "Login failed");
        setSubmitting(false);
      }
    } catch (error) {
      toast.error("An error occurred");
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer />
      <CssBaseline />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          position: "relative",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: 2,
            background: "linear-gradient(to right, #f5f5f5, #e0e0e0)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "30%",
            transform: "translateY(-20%)",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{ mb: 2, color: "#1976d2" }}
          >
            Sign in
          </Typography>
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  id="email"
                  name="email"
                  label="Email Address"
                  autoComplete="email"
                  autoFocus
                  variant="outlined"
                  helperText={<ErrorMessage name="email" />}
                  error={!!(<ErrorMessage name="email" />)}
                />
                <Field
                  as={TextField}
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="outlined"
                  helperText={<ErrorMessage name="password" />}
                  error={!!(<ErrorMessage name="password" />)}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
                <Typography variant="body2" align="center">
                  {"Don't have an account? "}
                  <Link href="/register" style={{ textDecoration: "none" }}>
                    <Button color="secondary">Sign Up</Button>
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
