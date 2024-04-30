import React from 'react'

const Sidebar = ({showFirmHandler, addproductHandler,allProductsHandler,showAddfirmTitle,userdetailsHandler}) => {
  return (
    <div className="sideBarSection">
        <ul>
            {showAddfirmTitle ? <li className='sideButtons' onClick={showFirmHandler}>Add Firm</li> : ""}
            <li className='sideButtons' onClick={ addproductHandler}>Add Product</li>
            <li className='sideButtons' onClick={allProductsHandler}>My Products</li>
            <li className='sideButtons' onClick={userdetailsHandler}>User Details</li>
        </ul>
    </div>
  )
}

export default Sidebar
