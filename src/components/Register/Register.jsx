"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Snackbar, Alert } from "@mui/material";
import { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

const theme = createTheme();

const validationSchema = Yup.object({
  firstName: Yup.string().trim().required("First name is required."),
  lastName: Yup.string().trim().required("Last name is required."),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Email is required."),
  password: Yup.string().trim().required("Password is required."),
  phonenumber: Yup.string()
    .trim()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits.")
    .required("Phone number is required."),
});

export default function Register() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/register", values);

      if (response.data.success === true) {
        setMessage(response.data.message || "User registered successfully!");
        setSeverity("success");
        formRef.current.resetForm();
      } else {
        setMessage(response.data.message || "Registration failed.");
        setSeverity("error");
      }
    } catch (error) {
      setMessage("An error occurred.");
      setSeverity("error");
    }
    setLoading(false);
    setOpen(true);
    setSubmitting(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              phonenumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            innerRef={formRef}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} mt={4}>
                    <Field name="firstName">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="First Name"
                          autoComplete="given-name"
                          autoFocus
                          error={touched.firstName && !!errors.firstName}
                          helperText={<ErrorMessage name="firstName" />}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6} mt={4}>
                    <Field name="lastName">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Last Name"
                          autoComplete="family-name"
                          error={touched.lastName && !!errors.lastName}
                          helperText={<ErrorMessage name="lastName" />}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="email">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Email Address"
                          autoComplete="email"
                          error={touched.email && !!errors.email}
                          helperText={<ErrorMessage name="email" />}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="phonenumber">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Phone Number"
                          error={touched.phonenumber && !!errors.phonenumber}
                          helperText={<ErrorMessage name="phonenumber" />}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="password">
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label="Password"
                          type="password"
                          autoComplete="new-password"
                          error={touched.password && !!errors.password}
                          helperText={<ErrorMessage name="password" />}
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                  disabled={isSubmitting}
                >
                  Register
                </Button>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Link href="/" variant="body2">
                      Home
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
          {loading && (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1200,
              }}
            >
              <ClipLoader color="#1976d2" size={50} />
            </Box>
          )}
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            width: "auto",
            maxWidth: 500,
          }}
        >
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleClose}
              severity={severity}
              sx={{
                width: "auto",
                maxWidth: 400,
                fontSize: "1rem",
                lineHeight: "1.25rem",
                fontWeight: "600",
                letterSpacing: "0.01em",
                backgroundColor: severity === "error" ? "#f44336" : "#4caf50",
                color: "#ffffff",
                borderRadius: "4px",
                padding: "12px 16px",
                boxShadow: 3,
              }}
            >
              {message}
            </Alert>
          </Snackbar>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
