import React, { useState } from 'react'
import { API_URL } from '../../Data/ApiPath'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { LocalActivity, LocalBarTwoTone, LockClock } from '@mui/icons-material';






const Login = ({welcomehandler,setShowlogout}) => {

 

  const [email,setEmail]=useState('')

  const [password,setpassword]=useState('')

  const loginHandler=async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/vendor/login`,{
        method:"POST",
        headers:{
          'Content-Type':"application/json"
        },
        body:JSON.stringify({email,password})
      })

      const data=await response.json()

      console.log(data)
      const usernameinvalid= data.error==="Invaild username or password"
      if(usernameinvalid){
        alert('Invalid Username or Password')
      }

      const vendorId=data.vendorId

      localStorage.setItem('vendorId',vendorId)

      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)
      
      const vendorData= await vendorResponse.json()
      // console.log("Vendor data:",vendorData)

      try {
        const vendorFirmName= vendorData.vendor.firm[0].firmName 

        // console.log("vendorFirmname :",vendorFirmName)
  
        localStorage.setItem('vendorFirmName',vendorFirmName) 
                                                                 
      } catch (error) {
        // console.log("Please Add firm")      
      }

      const vendorFirmId=vendorData.vendorFirmId

      // console.log("vendorFirmId :",vendorFirmId)

      
      localStorage.setItem('vendorFirmId',vendorFirmId)



      if(response.ok){
        console.log(data)
        alert('Login Success')
       
       
        setEmail('')
        setpassword('')
        

        localStorage.setItem('loginToken',data.token)

        
        
        welcomehandler(data.username)

        setShowlogout(true)
        
       
      }else{
        
      }

      

     
    } catch (error) {
      console.log(error)
      alert('Login Failed')
      
    }
  }

  

  return (
    
      <Container component="main" maxWidth="xl" className='loginSection'>
        <Box  textAlign='center' sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',width:'90%', maxWidth:'100vw' }}>
        <LockOutlinedIcon sx={{ fontSize: 'large' }} />
        
        <Typography component="h5" variant="h5" fontSize='20px' >
          Vendor Login 
        </Typography>
        <Box component="form" onSubmit={loginHandler} textAlign='center' >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            autoComplete="email"
            autoFocus
            value={email}
            
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            
            onChange={(e) => setpassword(e.target.value)}
          />
          <Box textAlign='center'>
          <Button   type="submit"  variant="contained" sx={{ mt: 2, mb: 2 }}>
            Log In
          </Button>
          </Box>
        </Box>
      </Box>
      </Container>
    
);
}

export default Login
