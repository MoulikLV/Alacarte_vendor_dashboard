import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar'
import Login from '../Components/forms/Login'
import Register from '../Components/forms/Register'
import AddFirm from '../Components/forms/AddFirm'
import AddProduct from '../Components/forms/AddProduct'
import WelcomePage from './WelcomePage'
import AllProducts from '../Components/AllProducts'
import Userdetails from '../Components/forms/Userdetails'

const formTypes={
  welcome:'WELCOME',
  addProduct:"ADD_PRODUCT",
  allProducts:'ALL_PRODUCTS',
  userDetails:"USER_DETAILS",
  regsitrationForm:'REGISTRATION_FORM',
  loginForm:"LOGIN_FORM",
  addFirm:'ADD_FIRM'
}

const LandingPage = () => {

  const [selectedForm,setSelectedForm]=useState(formTypes.welcome)
  
  const [isLoggedIn,setIsloggedIn]=useState(false)
   
  const [showfirmName,setShowFirmName]=useState("")  
   
  const [showAddfirmTitle,setShowAddfirmTitle]=useState(true)

  const logintoken=localStorage.getItem('loginToken')

    useEffect(()=>{
        if(logintoken){
          setIsloggedIn(true)
      } else{
          setSelectedForm(formTypes.loginForm)
        }

   },[logintoken])  

    useEffect(()=>{
      const firmName=localStorage.getItem('vendorFirmName')
       if(firmName){
         setShowFirmName(firmName)
         setShowAddfirmTitle(false)
      }
   })

    const showLoginhandler=()=>{
    setSelectedForm(formTypes.loginForm)   
   }

    const showRegisterhandler=()=>{
     setSelectedForm(formTypes.regsitrationForm)
   }

    const showFirmHandler=()=>{
        setSelectedForm(formTypes.addFirm)
     }
   
    const addProductHandler=()=>{
        setSelectedForm(formTypes.addProduct)
   }

   

   const allProductsHandler=()=>{
       setSelectedForm(formTypes.allProducts)
  }
  

   const userDetailsHandler=()=>{
       setSelectedForm(formTypes.userDetails)
  }
     
  const logoutHandler=()=>{
      const logoutConfirm= window.confirm("Are you sure to Logout?")
      if(!logoutConfirm){
        return
      }
      localStorage.removeItem('loginToken')
      localStorage.removeItem('vendorFirmId')
      localStorage.removeItem('vendorFirmName')
      localStorage.removeItem('vendorId')
      localStorage.removeItem('userName')
      setIsloggedIn(false)
      window.location.reload()
  }
   
   return (
     <section className='landingsection'>
        <Navbar showLoginhandler={showLoginhandler} showRegisterhandler={showRegisterhandler}  isLoggedIn={isLoggedIn}   logoutHandler={logoutHandler} showfirmName={showfirmName}  />
      <div className="collectionSection">
      {isLoggedIn && <Sidebar showFirmHandler={showFirmHandler} addproductHandler={addProductHandler} allProductsHandler={allProductsHandler} showAddfirmTitle={showAddfirmTitle} userdetailsHandler={userDetailsHandler}/>}
        {!isLoggedIn && selectedForm===formTypes.loginForm &&  <Login  showRegisterhandler={showRegisterhandler} setIsloggedIn={setIsloggedIn}/>}
        {!isLoggedIn && selectedForm===formTypes.regsitrationForm &&  <Register showLoginhandler={showLoginhandler} />}
        {selectedForm===formTypes.addFirm  && <AddFirm addproductHandler={addProductHandler} setShowFirmName={setShowFirmName}/>}
        {selectedForm===formTypes.addProduct &&   <AddProduct/>}
        {selectedForm===formTypes.welcome  && isLoggedIn && <WelcomePage/>}
        {selectedForm===formTypes.allProducts && <AllProducts/>}
        {selectedForm===formTypes.userDetails && <Userdetails/>}
        
      </div>

    </section>  
  )
}

export default LandingPage;
