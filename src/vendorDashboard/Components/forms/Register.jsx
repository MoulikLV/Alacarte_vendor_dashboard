import React, { useState } from "react";
import { API_URL } from "../../Data/ApiPath";


import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


const Register = ({showLoginhandler}) => {

  const [username,setUsername]=useState('')

  const [email,setEmail]=useState('')

  const [password,setPassword]=useState('')

  // const [error,setError]=useState('')

  // const [loading,setLoading]=useState(true)

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      const response= await fetch(`${API_URL}/vendor/register`,{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body:JSON.stringify({username,email,password})
      })

      const data =await response.json()  

      if(response.ok){
        console.log(data)
        alert("Vendor Registered Succesfully")
        
        setUsername('')
        setEmail('')
        setPassword('')
        showLoginhandler()

      }else{
        console.log(data.error)
      }
    } catch(error) {
      console.log(error)
      alert("Vendor Registration failed")

      
    }

    

  }

  return (
     <Container component="main" maxWidth="xl">
         <Typography component="h3" variant="h6" textAlign='center' marginTop='20px'>
            Vendor Register
          </Typography  >
      <Box textAlign='center' marginTop='30px'>
        <div className="registerSection">
         
          <form className="authForm" onSubmit={handleSubmit}>
          <label >Username :</label>
          <TextField
              margin="normal"
              required
              fullWidth 
              id="username"
              placeholder=" Enter username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
             <label >Email :</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              placeholder="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label >Password :</label>
            <TextField 
              margin="normal"
              required
              fullWidth
              name="password"
              placeholder="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Box textAlign="center">
              <Button variant="contained" color="success" type="submit">
                Register
              </Button>
            </Box>
          </form>
        </div>
        </Box>
      </Container>
  );
};

export default Register;
