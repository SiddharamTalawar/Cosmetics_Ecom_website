import { useState } from 'react'
import { FaIndianRupeeSign } from "react-icons/fa6";
import { LiaRupeeSignSolid } from "react-icons/lia";
function Products(props) {
    
    
    let img = [props.product.product_image]
    
    return (
        <div className="products ">
            <div className="product_image w-44 h-44 mb-3">
                <img src={img} alt="product image" />
            </div>
            <div className="product_name ">
            <h1 className='text-sm text-gray-600 mb-1'>{props.product.category.category_name}</h1>
                <h1 className='text-lg mb-1'>{props.product.product_name}</h1>
                
                
            </div>
            
            <div className="product_price flex">
                <div className='flex flex-row text-center'><i className='mt-1  '><LiaRupeeSignSolid/></i><span className='pb-1 -ml-1'>{props.product.product_price}</span></div>
            </div> 
        </div>
    )
}
export default Products