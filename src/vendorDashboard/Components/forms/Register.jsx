import React, { useState } from "react";
import { API_URL } from "../../Data/ApiPath";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MuiAlert from '@mui/material/Alert';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Typography from "@mui/material/Typography";
import { CircularProgress, Snackbar } from "@mui/material";


const Register = ({ showLoginhandler }) => {
  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [snackAlert,setSnackALert]=useState(false)

  const [snackMessage,setSnackMessage]=useState('')

  const [snackSeverity,setSnackSeverity]=useState('success')

  const [loading,setLoading]=useState(false)

  const handleSnackALert=()=>{
    setSnackALert(false)
  }

  const handleSubmit = async (e) => {
       e.preventDefault();
       setLoading(true)
    try {
      const response = await fetch(`${API_URL}/vendor/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        setSnackALert(true)
        setSnackMessage('Vendor Registered Succesfully')
        setSnackSeverity('success')
        

        setUsername("");
        setEmail("");
        setPassword("");
        setTimeout(() => {
          showLoginhandler();
        }, 3000);

      } else {
       
        setSnackALert(true)
        setSnackMessage('Vendor Registration Failed')
        setSnackSeverity('error')
      }
    } catch (error) {
      console.log(error);
      
    }finally{
      setLoading(false)
    }
  };

  return (
    <Container component="main" maxWidth="sm"  className="registerBox" >
      <Box 
        textAlign="center"
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        

        <Typography component="h5" variant="h5" fontSize="20px">
          Vendor Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} textAlign="center">
          <TextField  className="registerInput"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField className="registerInput"
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            type="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField className="registerInput"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box textAlign="center">
            <Button type="submit" variant="contained" sx={{ mt: 2, mb: 2 }}>
              {loading ? <CircularProgress size={24} color="primary"/> : "Register"}
            </Button>
          </Box>
         
        </Box>
        <span className="haveAccount">Have an account already?<span className="registerHere" onClick={showLoginhandler}>&nbsp;Sign In</span></span>
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackAlert}
        autoHideDuration={4000}
        onClose={handleSnackALert}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackALert} severity={snackSeverity}>
          {snackMessage}
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Register;
