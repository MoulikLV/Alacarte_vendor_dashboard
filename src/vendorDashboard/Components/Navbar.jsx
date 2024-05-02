import React from 'react'


const Navbar = ({showLoginhandler,showRegisterhandler,logoutHandler,showfirmName,isLoggedIn}) => {
  return (
   
      <div className="navSection">
        <div className='navLogo' >
           <img className='alacarteLogo' src='https://images-platform.99static.com/6HXDHT7xsYqeWwmKt4c2bfm7MaU=/250x125:1250x1125/500x500/top/smart/99designs-contests-attachments/84/84766/attachment_84766238' alt=''/>
           <div className="company" >
           A la`carte Dashboard
            
        </div>
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
