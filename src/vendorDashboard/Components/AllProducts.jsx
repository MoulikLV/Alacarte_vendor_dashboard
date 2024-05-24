import React, { useEffect, useState } from 'react'
import { API_URL } from '../Data/ApiPath'
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const AllProducts = () => {

    const [products,setProducts]=useState([])

    const [loading,setLoading]=useState(true)

    const [snackAlert,setSnackALert]=useState(false)

    const [snackMessage,setSnackMessage]=useState('')
  
    const [snackSeverity,setSnackSeverity]=useState('success')

    const handleSnackAlert=()=>{
      setSnackALert(false)
    }

    const allProductHandler=async()=>{
        const firmId=localStorage.getItem('vendorFirmId')
        if(!firmId){
          
          setLoading(false)
          
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
          setSnackALert(true)
           setSnackMessage('Product Deleted Succesfully')
           setSnackSeverity('success')
          setProducts(products.filter(product=>product._id!== productId))
         
         
        }
        else{
         
          setSnackALert(true)
          setSnackMessage('Product Deletion Failed')
          setSnackSeverity('error')
        }
        


      } catch (error) {
        console.error(error)
        setSnackALert(true)
        setSnackMessage('Product Deletion Failed')
        setSnackSeverity('error')
        
       
        
      }
      finally{
        setLoading(false)
      }
    }
  return (
    
      <>
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
                        <td> <Button onClick={()=>deleteProductById(item._id)} size="small" color="error">Delete</Button></td>
                      </tr>
                      </>
                    )
                  })}
                </tbody>
            </table>
         
      )}
    </div>
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
      </>
  
  )
}

export default AllProducts

