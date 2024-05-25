import React from "react";
import Bottom from "../../components/Bottom";
import "./Login.css";
import circle from "../../assets/images/gradient_circle.svg";
import login_circle from "../../assets/images/login_circle.svg";
import back from "../../assets/images/back.svg";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function Reg() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
  };
  return (
    <div className="background">
      <Link className="" to="/LogReg">
        <img className="back-button icon" src={back} alt="" />
      </Link>

      <div className="container">
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 35 }}
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
          />
          <TextField
            sx={{ mt: 6, 
              
          }}
          
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Grid container>
            <Grid item xs>
              <Link to="/forgot_pass">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/reg">{"Don't have an account? Sign Up"}</Link>
            </Grid>
          </Grid>
        </Box>
        <Link className="login-button" to="/statistic">
          <span></span>
          LOGIN
        </Link>

        <img className="login_circle" src={login_circle} alt="" />
        <img className="circle" src={circle} alt="" />
      </div>
      <Bottom />
    </div>
  );
}
