import React, { useState } from 'react'
import { API_URL } from '../../Data/ApiPath'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress'; 
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';







const Login = ({showRegisterhandler,setIsloggedIn}) => {

 

  const [email,setEmail]=useState('')

  const [password,setpassword]=useState('')

  const [loading,setLoading]=useState(false)

  const [snackAlert,setSnackALert]=useState(false)

  const [snackMessage,setSnackMessage]=useState('')

  const [snackSeverity,setSnackSeverity]=useState('success')

  const handleSnackALert=()=>{
    setSnackALert(false)
  }

  const loginHandler=async(e)=>{
    e.preventDefault()
    setLoading(true)
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
        setSnackALert(true)
        setSnackMessage('Invaild username or password')
        setSnackSeverity('error')
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
      }finally{
        setLoading(false)
      }

      const vendorFirmId=vendorData.vendorFirmId

      // console.log("vendorFirmId :",vendorFirmId)

      
      localStorage.setItem('vendorFirmId',vendorFirmId)



      if(response.ok){
        setSnackALert(true)
        setSnackMessage('Login Successful')
        setSnackSeverity('success')
       
        console.log(data)
        // alert('Login Success')
        
        
       
       
        setEmail('')
        setpassword('')
        

        localStorage.setItem('loginToken',data.token)

        localStorage.setItem('userName',data.username)
        
       

        // setIsloggedIn(true)
        // window.location.reload() 
        setTimeout(() => {
          window.location.reload() 
        }, 2000);
      }
      

     
    } catch (error) {
      console.log(error)
      alert('Login Failed')
      
    }
  }

  

  return (
    
      <Container component="main" maxWidth="xl" className='loginSection' >
        <Box   textAlign='center' sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
          <Button   type="submit"  variant="contained" sx={{ mt: 2, mb: 2 }} disabled={loading}>

            {loading ? <CircularProgress size={24} color="primary"/> : 'Login'}
          </Button>
          </Box>
        </Box>
        <span className='dontAccount'>Don`t have an account? <span onClick={showRegisterhandler} className='registerHere'>Register here!</span></span>
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
}

export default Login
