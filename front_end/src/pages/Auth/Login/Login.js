import React, { useState } from "react";
import Bottom from "../../../components/Home/Bottom";
import "./Login.css";
import circle from "../../../assets/images/gradient_circle.svg";
import login_circle from "../../../assets/images/login_circle.svg";
import back from "../../../assets/images/back.svg";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AuthService from "../../../services/AuthService.js";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await AuthService.login(formData.email, formData.password);
      if (data.statusCode === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
        setSnackbarSeverity("success");
        setSnackbarMessage("User logged in successfully");
        setSnackbarOpen(true);
        navigate("/main");
      } else {
        setSnackbarSeverity("error");
        setSnackbarMessage("An error occurred while logging in");
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error("Error logging in user:", error);
      setSnackbarSeverity("error");
      setSnackbarMessage("An error occurred while logging in");
      setSnackbarOpen(true);
    }
  };

  return (
    <div className="background">
      <Link className="" to="/auth">
        <img className="back-button icon" src={back} alt="" />
      </Link>

      <div className="container">
        <Box
                    width={"50vh"}

          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: "25vh" }}
          position={"absolute"}
          zIndex={4}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
          />
          <TextField
            sx={{ mt: "7vh" }}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
          />
          <Grid container  sx={{mb:"4vh" }}             spacing={"5vh"}
>
            {/* <Grid item xs>
              <Link to="/forgot_pass">Forgot password?</Link>
            </Grid> */}
            <Grid item>
              <Link className="text" to="/auth/reg">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
          <Grid container justifyContent="center"><Grid >
              <button className="login-button" type="submit">
                LOGIN
              </button>
            </Grid></Grid>
          

          
        </Box>

        <img className="login_circle" src={login_circle} alt="" />
        <img className="circle" src={circle} alt="" />
      </div>
      <Bottom />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <MuiAlert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
