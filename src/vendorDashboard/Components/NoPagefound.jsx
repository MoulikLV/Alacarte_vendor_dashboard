import React from 'react'
import { Link } from 'react-router-dom'
import LandingPage from '../Pages/LandingPage'

const NoPagefound = () => {
  return (
  
     <div style={{fontFamily:"revert-layer"}} className='errorSection'>
      <h2>Error: 404</h2>
      <h4>Page Not Found</h4>
      <Link to='/'>Go back</Link>
    </div>
   
  )
}

export default NoPagefound
