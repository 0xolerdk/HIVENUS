import React from "react";
import Bottom from "../../components/Bottom";
import "./Reg.css";
import circle from "../../assets/images/gradient_circle.svg";
import reg_circle from "../../assets/images/reg_circle.svg";
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
      password2: data.get("password2"),
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
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 27 }}
          position={"absolute"}
          zIndex={4}
        >
          <Grid
            width={500}
            xs={13}
            container
            spacing={7}
            // direction="column"
            justifyContent="center"
            alignItems="center"
          >
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
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password2"
                label="Password"
                type="password"
                id="password2"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link className="" to="/login">
                  Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Link className="login-button" to="/statistic">
        <span></span>
              REGISTER
              </Link>
        <img className="reg_circle" src={reg_circle} alt="" />

        <img className="circle" src={circle} alt="" />
      </div>
      <Bottom />
    </div>
  );
}
