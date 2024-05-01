import React, { useEffect, useState } from "react";
import MuiAlert from '@mui/material/Alert';
import { Button, CircularProgress, Snackbar } from "@mui/material";
import { API_URL } from "../../Data/ApiPath";

const AddProduct = () => {
  
  const [productName,setProductName]=useState('')

  const [price,setPrice]=useState('')

  const [category,setCategory]=useState([])

  const [description,setDescription]=useState('')

  const [image,setImage]=useState(null)  

  const [bestSeller,setBestSeller]=useState(false)

  const [snackAlert,setSnackALert]=useState(false)

  const [snackMessage,setSnackMessage]=useState('')

  const [snackSeverity,setSnackSeverity]=useState('success')

  

  const [loading,setLoading]=useState(false)

  

  const handleSnackAlert=()=>{
    setSnackALert(false)
  }

  const handleCategoryChange=(event)=>{
    const value = event.target.value;
    if(category.includes(value)){
      setCategory(category.filter((item)=>item !== value))
    }else{
      setCategory([...category,value])
    }
}

  const bestSellerHandler=(e)=>{
    const value= e.target.value=== "true"
    setBestSeller(value)
  }

  const imageHandler=(e)=>{
    const selectedImage= e.target.files[0]
    setImage(selectedImage)
  }
 
 

  const addProductHandler=async(e)=>{
    e.preventDefault()
    setLoading(true)

    try {

      const loginToken = localStorage.getItem('loginToken')
      const vendorFirmId= localStorage.getItem('vendorFirmId')

      if(!loginToken || !vendorFirmId){
        console.error('User Not Authenticated')         
        alert('Please Login to add Product')

      }

      const formData= new FormData()
      formData.append('productName',productName)
      formData.append('price',price)
      formData.append('description',description)
      formData.append('image',image)

      category.forEach(value=>{
        formData.append('category',value)
      })

      const response = await fetch(`${API_URL}/product/add-product/${vendorFirmId}`,{
        method:"POST",
        body: formData
      })
      // console.log(response)
      const data= await response.json()
      // console.log(data)

      if(response.ok){
        
        setSnackALert(true)
        setSnackMessage('Product Added Succesfully')
        setSnackSeverity('success')
        
        setProductName('')
        setPrice('')
        setDescription('')
        setCategory([])
        setBestSeller(false)
        setImage(null)
       
        
      }else{
        setSnackALert(true)
        setSnackMessage('Failed to add product')
        setSnackSeverity('error')
        
      }

    } catch (error) {
       console.error(error)
       
    }finally{
      setLoading(false)
    }


  }


  return (
    <div className="firmSection">
      <h3>Add Products</h3>
      <form className="tableForm" onSubmit={addProductHandler}>
        <label>Product Name</label>
        <input type="text" name="productName" value={productName} onChange={(e)=>setProductName(e.target.value)} />
        <br />
        <label>Price</label>
        <input type="text" name="price" value={price} onChange={(e)=>setPrice(e.target.value)} />
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
              <input type="checkbox" checked={category.includes('non-veg')} value="non-veg" onChange={handleCategoryChange}/>
            </div>
          </div>
        </div>
        <br/>
       
        {/* <label>BestSeller</label>
        <input type="text" /> */}
        <div className="check-inp">
          <label>BestSeller:</label>
          <div className="radioContainer">
            <label>Yes</label>
            <input type="radio" value='true' checked={bestSeller===true} onChange={bestSellerHandler}/>
          </div>
          <div className="radioContainer">
            <label>No</label>
            <input type="radio" value='false' checked={bestSeller===false} onChange={bestSellerHandler}/>
          </div>
        </div>
        <br />
        <label>Description</label>
        <input type="text" name="description" value={description} onChange={(e)=>setDescription(e.target.value)}/>
        <br />
        <label>Product Image</label>
        <input type="file" name="image"  onChange={imageHandler}/>
        <br />
        <div className="btnSubmit">
        <Button type="submit" variant="contained" color="success">
          {loading ? <CircularProgress size={24} color="primary"/> : "Add Product"}
          </Button>
        </div>
      </form>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        open={snackAlert}
        autoHideDuration={4000}
        onClose={handleSnackAlert}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleSnackAlert} severity={snackSeverity}>
          {snackMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default AddProduct;
