import React, { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { API_URL } from "../../Data/ApiPath";

const AddProduct = () => {
  
  const [productName,setProductName]=useState('')

  const [price,setPrice]=useState('')

  const [category,setCategory]=useState([])

  const [description,setDescription]=useState('')

  const [image,setImage]=useState(null)  

  const [bestSeller,setBestSeller]=useState(false)

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
        alert('Product added Succesfully')
        
        setProductName('')
        setPrice('')
        setDescription('')
        setCategory([])
        setBestSeller(false)
        setImage(null)
       
        
      }else{
        alert('Failed to add Product')
      }

    } catch (error) {
       console.error(error)
       alert("Failed to add Product")
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
        <Button type="submit" variant="contained" color="success">Add Product</Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
