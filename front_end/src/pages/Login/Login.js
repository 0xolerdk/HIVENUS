import React, { useState } from "react";
import Bottom from "../../components/Bottom";
import "./Login.css";
import circle from "../../assets/images/gradient_circle.svg";
import login_circle from "../../assets/images/login_circle.svg";
import back from "../../assets/images/back.svg";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UserService from '../../service/logRegLogic';

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    console.log('submit');
    event.preventDefault();
    try {
      const data = await UserService.login(formData.email, formData.password);
      if (data.statusCode === 200) {
        localStorage.setItem('token', data.token);
        alert('User logged in successfully');
        navigate('/main');
      } else {
        alert('An error occurred while logging in');
      }
    } catch (error) {
      console.error('Error logging in user:', error);
      alert('An error occurred while logging in');
    }
  };

  return (
    <div className="background">
      <Link className="" to="/auth">
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
            onChange={handleInputChange}
          />
          <TextField
            sx={{ mt: 6 }}
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


          <Grid container>
            <Grid item xs>
              <Link to="/forgot_pass">Forgot password?</Link>
            </Grid>
            <Grid item>
              <Link to="/auth/reg">{"Don't have an account? Sign Up"}</Link>
            </Grid>
            <Grid item>              <button className="login-button" type="submit"><span></span>LOGIN</button>
</Grid>
          </Grid>
        </Box>


        <img className="login_circle" src={login_circle} alt="" />
        <img className="circle" src={circle} alt="" />
      </div>
      <Bottom />
    </div>
  );
}
