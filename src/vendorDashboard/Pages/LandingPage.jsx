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

const LandingPage = () => {

   const [showLogin,setShowLogin]=useState(false)

   const [showRegister,setShowregister]=useState(false)

   const [showAddfirm,setShowAddfirm]=useState(false)

   const [showAddproduct,setShowAddproduct]=useState(false)

   const [showWelcomepage,setWelcomepage]=useState(false)

   const [allProducts,setAllproducts]=useState(false)

   const [username,setUsername]=useState('')

   const [showLogout,setShowlogout]=useState(false)

   const [showfirmName,setShowFirmName]=useState("")  
   
   const [showAddfirmTitle,setShowAddfirmTitle]=useState(true)

   const [showUserdetails,setshowUserdetails]=useState(false)

   useEffect(()=>{
        const logintoken=localStorage.getItem('loginToken')
        if(logintoken){
          setShowlogout(true)
          setShowLogin(false)

        }else{
          setShowLogin(true)
          
        }
   },[])  

   useEffect(()=>{
    const firmName=localStorage.getItem('vendorFirmName')
    if(firmName){
      setShowFirmName(firmName)
      setShowAddfirmTitle(false)
    }
   })

   const showLoginhandler=()=>{
    setShowLogin(true)
    setShowregister(false)
    setShowAddfirm(false)
    setShowAddproduct(false)
    setWelcomepage(false)
    setAllproducts(false)
    setshowUserdetails(false)
   }

   const logoutHandler=()=>{
    const logoutConfirm= window.confirm("Are you sure to Logout?")
    if(!logoutConfirm){
      return
    }
    localStorage.removeItem('loginToken')
    localStorage.removeItem('vendorFirmId')
    localStorage.removeItem('vendorFirmName')
    setShowlogout(false)
    window.location.reload()
   }

   const showRegisterhandler=()=>{
     setShowLogin(false)
    setShowregister(true)
    
    setShowAddfirm(false)
    setShowAddproduct(false)
    setWelcomepage(false)
    setAllproducts(false)
    setshowUserdetails(false)
   }

   const showFirmHandler=()=>{
    if(showLogout){
    setShowAddfirm(true)
    setShowLogin(false)
    setShowregister(false)
    setShowAddproduct(false)
    setWelcomepage(false)
    setAllproducts(false)
    setshowUserdetails(false)
    }else{
      alert('Please login to add firm')
      setShowLogin(true)
      setShowregister(false)

    }
   }

   const addproductHandler=()=>{
   if(showLogout){
    setShowAddproduct(true)
    setShowregister(false)
    setShowLogin(false)
    setShowAddfirm(false)
    setWelcomepage(false)
    setAllproducts(false)
    setshowUserdetails(false)
   }else{
    alert('Please Login to add products')
    setShowLogin(true)
    setShowregister(false)

   }
   }

   const welcomehandler=(username)=>{
    setShowAddproduct(false)
    setShowregister(false)
    setShowLogin(false)
    setShowAddfirm(false)
    setShowAddproduct(false)
    setWelcomepage(true)
    setUsername(username)
    setAllproducts(false)
    setshowUserdetails(false)

    
   }

   const allProductsHandler=()=>{
    if(showLogout){
      setAllproducts(true)
    setShowAddproduct(false)
    setShowregister(false)
    setShowLogin(false)
    setShowAddfirm(false)
    setWelcomepage(false)
    setshowUserdetails(false)
    }else{
      alert('Please Login to see products')
      setShowLogin(true)
      setShowregister(false)
    }
   }

   const userdetailsHandler=()=>{
    
     if(showLogout){
      setAllproducts(false)
      setShowAddproduct(false)
      setShowregister(false)
      setShowLogin(false)
      setShowAddfirm(false)
      setWelcomepage(false)
      setshowUserdetails(true)
     }else{
      alert('Please login to see user details')
      setShowLogin(true)
      setShowregister(false)
     }
   
   }

  //  useEffect(()=>{
    
      
  //     const loginToken=localStorage.getItem('loginToken')
  //     if(loginToken){
  //       setShowLogin(false)
  //     }else{
  //       setShowLogin(true)
  //     }

  //     // if(!showLogout){
  //     //   setShowLogin(true)
  //     // }else{
  //     //   setShowLogin(false)
  //     // }
    
  //  },[])

   


  return (
    <section className='landingsection'>
        <Navbar showLoginhandler={showLoginhandler} showRegisterhandler={showRegisterhandler}  showLogout={showLogout}  logoutHandler={logoutHandler} showfirmName={showfirmName}  />
      <div className="collectionSection">
      <Sidebar showFirmHandler={showFirmHandler} addproductHandler={addproductHandler} allProductsHandler={allProductsHandler} showAddfirmTitle={showAddfirmTitle} userdetailsHandler={userdetailsHandler}/>
        {showLogin &&  <Login welcomehandler={welcomehandler} setShowlogout={setShowlogout} />}
        {showRegister &&  <Register showLoginhandler={showLoginhandler} />}
        {showAddfirm && showLogout && <AddFirm addproductHandler={addproductHandler} setShowFirmName={setShowFirmName}/>}
        {showAddproduct &&  showLogout && <AddProduct/>}
        {showWelcomepage && <WelcomePage username={username}/>}
        {allProducts && showLogout && <AllProducts/>}
        {showUserdetails && showLogout && <Userdetails/>}
        
      </div>

    </section>  
  )
}


export default LandingPage;
