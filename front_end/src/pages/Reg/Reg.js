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
import UserService from '../../service/logRegLogic';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Reg() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '-'
});

const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
};

const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
  // At least 8 characters long, contains a number, a lowercase and an uppercase letter
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
}

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(formData.email)) {
      alert('Invalid email format');
      return;
    }
    if (!validatePassword(formData.password)) {
      alert('Password must be at least 8 characters long, contain a number, a lowercase and an uppercase letter');
      return;
    }
    try {
        // Call the register method from UserService

        const token = localStorage.getItem('token');
        var data = await UserService.register(formData, token);

        // Clear the form fields after successful registration
        setFormData({
            name: '',
            email: '',
            password: '',
            role: '-',
        });
        if (data.statusCode == 400) {
          alert('A user with this email already exists');
        }
        else{
          alert('User registered successfully');
          navigate('/main');
        }


    } catch (error) {
        console.error('Error registering user:', error);
        alert('An error occurred while registering user');
    }
};


  return (
    <div className="background">
      <Link className="" to="/auth">
        <img className="back-button icon" src={back} alt="" />
      </Link>

      <div className="container" >
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
    id="name"
    label="Name"
    name="name"
    autoComplete="name"
    onChange={handleInputChange} // Add this line
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
    onChange={handleInputChange} // Add this line
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
    onChange={handleInputChange} // Add this line
  />
</Grid>
{/* <Grid item xs={12}>
  <TextField
    required
    fullWidth
    name="password2"
    label="Password"
    type="password"
    id="password2"
    autoComplete="new-password"
    onChange={handleInputChange} // Add this line
  />
</Grid> */}

            <Grid item>              <button className="login-button" type="submit"><span></span>REGISTER</button>
</Grid>
            
          </Grid>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link className="" to="/auth/login">
                  Already have an account? Sign in
              </Link>
              </Grid>
          </Grid>
          

        </Box>

        <img className="reg_circle" src={reg_circle} alt="" />

        <img className="circle" src={circle} alt="" />
      </div>
      <Bottom />
    </div>
  );
}
