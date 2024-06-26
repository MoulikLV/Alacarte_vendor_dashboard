import React, { useEffect, useState } from "react";
import { API_URL } from "../../Data/ApiPath";
import Button from '@mui/material/Button';
import { CircularProgress, Snackbar } from "@mui/material";
import MuiAlert from '@mui/material/Alert';

const AddFirm = ({addproductHandler,setShowFirmName}) => {
 
  const [firmName,setFirmName]=useState("")

  const [area,setArea]=useState('')

  const [offer,setOffer]=useState('')

  const [category,setCategory]=useState([])

  const [region,setRegion]=useState([])
  
  const [image,setImage]=useState(null)

  const [loading,setLoading]=useState(false)

  const [snackAlert,setSnackALert]=useState(false)

  const [snackMessage,setSnackMessage]=useState('')

  const [snackSeverity,setSnackSeverity]=useState('success')

  const handleCategoryChange=(event)=>{
      const value = event.target.value;
      if(category.includes(value)){
        setCategory(category.filter((item)=>item !== value))
      }else{
        setCategory([...category,value])
      }
  }

  useEffect(()=>{
    const firmName=localStorage.getItem('vendorFirmName')
    setShowFirmName(firmName)
   })

  
  const handleRegionChange=(event)=>{
    const value = event.target.value;
    if(region.includes(value)){
      setRegion(region.filter((item)=>item !== value))
    }else{
      setRegion([...region,value])
    }
}

const imageHandler=(e)=>{
   const selectedimage= e.target.files[0]
   setImage(selectedimage)

}

const handleSnackALert=()=>{
  setSnackALert(false)
}

 const addFirmhandler=async(e)=>{
    e.preventDefault()
    setLoading(true)
   try {
       const loginToken= localStorage.getItem('loginToken')

       if(!loginToken){
          alert("User not Authenticated")
          console.error("User not Authenticated")
       }

       const formData= new FormData()
       formData.append('firmName',firmName)
       formData.append('area',area)
       formData.append('offer',offer)
       formData.append('image',image)

       category.forEach(value=>{
        formData.append('category',value)
       })

       region.forEach((value)=>{
        formData.append('region',value)
       })

       const response= await fetch(`${API_URL}/firm/add-firm`,{
        method:"POST",
        headers:{
          'token':`${loginToken}`
        },
        body: formData
       })

       const data= await response.json()

      //  console.log(data)

       const vendorFirmId= data.firmId  

       const vendorFirmName=data.firmName

       localStorage.setItem('vendorFirmName',vendorFirmName)

      
       

      

       localStorage.setItem('vendorFirmId',vendorFirmId) 
       

       

       if(response.ok){
        console.log(data)
        setSnackALert(true)
        setSnackMessage('Firm Added Succesfully')
        setSnackSeverity('success')
        setTimeout(() => {
          addproductHandler()
        }, 2000);
        
        setFirmName('')
        setArea('')
        setOffer('')
        setImage(null)
        setCategory([])
        setRegion([])
       

       }else if(data.message=="Firm Already exists for this vendor"){
        
       }else{
        setSnackALert(true)
        setSnackMessage('Failed in adding Firm')
        setSnackSeverity('error')
       }

       


    } catch (error) {
      console.error(error)
        setSnackALert(true)
        setSnackMessage('Failed in adding Firm! Please try again later')
        setSnackSeverity('error')
      
    }finally{ 
      setLoading(false)
    }
  }


  return (
    <div className="firmSection">
      <h3>Add Firm</h3>
      <form className="tableForm" onSubmit={addFirmhandler}>
        <label>Firm Name</label>
        <input type="text" name="firmName" value={firmName} onChange={(e)=>setFirmName(e.target.value)} />
        <br />
        <label>Area</label>
        <input type="text" name="area" value={area} onChange={(e)=>setArea(e.target.value)} />
        <br />
        {/* <label>category</label>
          <input type="text" /> */}
        <div className="check-inp">
          <label>Category:</label>
          <div className="checkContainer">
            <div className="checkboxcontainer">
              <label>Veg</label>
              <input type="checkbox" checked={category.includes('veg')} value="veg" onChange={handleCategoryChange} />
            </div>
            <div className="checkboxcontainer">
              <label>Non-Veg</label>
              <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange} />
            </div>
          </div>
        </div>
        
        {/* <label>Region</label>
        <input type="text" /> */}
        
        
        <label>Offer</label>
        <input type="text" name="offer" value={offer} onChange={(e)=>setOffer(e.target.value)}/><br/>
        <div className="check-inp">
          <label>Region:</label>
          <div className="checkContainer">
          <div className="checkboxcontainer">
              <label>South</label>
              <input type="checkbox" value="south-indian" checked={region.includes('south-indian')} onChange={handleRegionChange} />
            </div>
            <div className="checkboxcontainer">
              <label>North</label>
              <input type="checkbox" value="north-indian" checked={region.includes('north-indian')} onChange={handleRegionChange}/>
            </div>
            <div className="checkboxcontainer">
              <label>Chinese</label>
              <input type="checkbox" value="chinese" checked={region.includes('chinese')} onChange={handleRegionChange} />
            </div>
            <div className="checkboxcontainer">
              <label>Bakery</label>
              <input type="checkbox" value="bakery" checked={region.includes('bakery')}  onChange={handleRegionChange}/>
            </div>
          </div>
        </div>
        <br />
        <label>Firm Image</label>
        <input type="file" name="image"  onChange={imageHandler}/>
    
        <br />
        <div className="btnSubmit">
        <Button type="submit" variant="contained" color="success">
         {loading ? <CircularProgress size={24} color="primary"/> : "Add Firm"}
          </Button>
        </div>
      </form>
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
    </div>
  );
};

export default AddFirm;
