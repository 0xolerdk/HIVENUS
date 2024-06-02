import React, { useState } from "react";
import Bottom from "../../components/Bottom";
import "./Reg.css";
import circle from "../../assets/images/gradient_circle.svg";
import reg_circle from "../../assets/images/reg_circle.svg";
import back from "../../assets/images/back.svg";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import UserService from '../../service/logRegLogic';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

export default function Reg() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '-'
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const validatePassword = (password) => {
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return re.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Invalid email format');
      setSnackbarOpen(true);
      return;
    }
    if (!validatePassword(formData.password)) {
      setSnackbarSeverity('error');
      setSnackbarMessage('Password must be at least 8 characters long, contain a number, a lowercase and an uppercase letter');
      setSnackbarOpen(true);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      var data = await UserService.register(formData, token);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: '-',
      });
      if (data.statusCode == 400) {
        setSnackbarSeverity('error');
        setSnackbarMessage('A user with this email already exists');
        setSnackbarOpen(true);
      } else {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_id', data.user_id);
        setSnackbarSeverity('success');
        setSnackbarMessage('User registered successfully');
        setSnackbarOpen(true);
        navigate('/main');
      }
    } catch (error) {
      console.error('Error registering user:', error);
      setSnackbarSeverity('error');
      setSnackbarMessage('An error occurred while registering user');
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
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 25 }}
          position={"absolute"}
          zIndex={4}
        >
          <Grid
            width={500}
            xs={13}
            container
            spacing={5}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </Grid>
            <Grid container justifyContent="flex-end" sx={{mt:2}}>
            <Grid item>
              <Link className="" to="/auth/login">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
            <Grid item>
              <button className="reg-button" type="submit">
                REGISTER
              </button>
            </Grid>
          </Grid>

          
        </Box>

        <img className="reg_circle" src={reg_circle} alt="" />
        <img className="circle" src={circle} alt="" />
      </div>
      <Bottom />
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={() => setSnackbarOpen(false)}>
        <MuiAlert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: "300px" }}>
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
