import React, { useEffect, useState } from 'react'
import { API_URL } from '../../Data/ApiPath'

const Userdetails = () => {

  const [userDetails,setUserDetails]=useState([])

 

  const fetchUserDetails= async()=>{
      
    try {
      const vendorId=localStorage.getItem('vendorId')
      if(!vendorId){
        alert('Something error')
      }

      const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`)

      const vendordata= await vendorResponse.json()

      const vendorDetails= await vendordata.vendor

      console.log("vendor details:",vendorDetails)

      setUserDetails(vendorDetails)

      
    } catch (error) {
      
    }



  }


  useEffect(()=>{
    fetchUserDetails()
  },[])
  
  return (
    <div className='all-userdetails'>
      <center>
        <h4>User Details</h4>
      </center>
      {!userDetails ? (<p>Please Add Firm to see user details</p>
    ):(
      <table className='userdetailstable'>
        <thead>
          <tr>
           
            <th>Username</th>
            <th>Email</th>
            <th>Firmname</th>
            <th>Firm ID</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{userDetails.username}</td>
            <td>{userDetails.email}</td>
            {userDetails.firm && userDetails.firm.map((firm,index)=>{
              return (<>
              <td key={index}>{firm.firmName}</td>
              <td key={index}>{firm._id}</td>
              </>)
              
            })}
            
          </tr>
          
        </tbody>
      </table>
    )}
    </div>
  )
}

export default Userdetails
