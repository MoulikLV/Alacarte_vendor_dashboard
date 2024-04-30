import React, { useEffect, useState } from 'react'
import { API_URL } from '../Data/ApiPath'
import Button from '@mui/material/Button';


const AllProducts = () => {

    const [products,setProducts]=useState([])

    const [loading,setLoading]=useState(true)

    const allProductHandler=async()=>{
        const firmId=localStorage.getItem('vendorFirmId')
        if(!firmId){
          
          setLoading(false)
          alert('Login to see products')
          return
                      
         
        }

        try {
            const response= await fetch(`${API_URL}/product/${firmId}/products`)

            const productsResponse= await response.json()
            setProducts(productsResponse.products)
            // console.log(productsResponse)

            

        } catch (error) {
            console.error(error)
            
        }
        
    }

    useEffect(()=>{
        allProductHandler()
        console.log('This is useEffect')
    },[])


    const deleteProductById= async (productId)=>{
      try {
        const confirmed= window.confirm('Confirm Delete Product?')
        if(!confirmed){
          return
        }
        const response = await fetch(`${API_URL}/product/deleteProduct/${productId}`,{
          method:"DELETE"
        })

        if(response.ok){
          
          setProducts(products.filter(product=>product._id!== productId))
         
         
        }
        else{
          alert('Product Deletion Failed')
        }
        


      } catch (error) {
        console.error(error)
        alert('Product Deletion Failed')
       
        
      }
      finally{
        setLoading(false)
      }
    }
  return (
    
      <div className="all-products-container" style={{maxHeight: '500px',  overflowY: 'auto' }}> 
      <center><h3>Your Items</h3></center>
      {!products? (<p>No Products</p>
      ) : (
            <table className='productsTable'>
                <thead>
                  <tr>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Product Image</th>
                    <th>Remove Item</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item)=>{
                    return (
                      <>
                      <tr key={item.id}  >
                        <td>{item._id}</td>
                        <td>{item.productName}</td>
                        <td>{item.price}</td>
                        <td>{item.image && <img style={{height:"50px",width:"60px"}} src={`${API_URL}/uploads/${item.image}`} alt={item.productName}/>}</td>
                        <td> <Button onClick={()=>deleteProductById(item._id)} size="small" color="error">
          Delete
        </Button> </td>
                      </tr>
                      </>
                    )
                  })}
                </tbody>
            </table>
      )}
    </div>
  
  )
}

export default AllProducts

