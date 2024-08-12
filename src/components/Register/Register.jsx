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
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import { useRef } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Register() {
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [severity, setSeverity] = React.useState("success");
  const formRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const response = await axios.post("/api/register", {
        firstName: data.get("firstName"),
        lastName: data.get("lastName"),
        email: data.get("email"),
        password: data.get("password"),
        phonenumber: data.get("phonenumber"),
      });

      console.log(response);

      if (response.data.success === true) {
        setMessage(response.data.message || "User registered successfully!");
        setSeverity("success");
        formRef.current.reset();
      } else {
        setMessage(response.data.message || "Registration failed.");
        setSeverity("error");
      }
    } catch (error) {
      setMessage("An error occurred.");
      setSeverity("error");
    }

    setOpen(true);
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
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            ref={formRef}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="phonenumber"
                  required
                  fullWidth
                  id="phonenumber"
                  label="Phone Number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="space-between" alignItems="center">
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
          </Box>
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
