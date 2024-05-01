import React from 'react'


const Navbar = ({showLoginhandler,showRegisterhandler,logoutHandler,showfirmName,isLoggedIn}) => {
  return (
   
      <div className="navSection">
        <div className="company">
           Vendor Dashboard
           
        </div>
        <div >
          <h5>{showfirmName? `Firmname : ${showfirmName}` : " "} </h5>
        </div>
        
        
        
        
        <div className="userAuth">
            { !isLoggedIn? <><span className='navButtons' onClick={showLoginhandler}>Login </span>/
            <span className='navButtons' onClick={showRegisterhandler}> Register</span> </>
             :  
            <span className='navButtons' onClick={logoutHandler}>  <i class="fa fa-sign-out"></i>Logout</span>}


        </div>

      </div>
   
  )
}

export default Navbar
